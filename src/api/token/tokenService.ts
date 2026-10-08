import { jwtDecode } from "jwt-decode";
import { disconnectSocket } from "../../utils/socket";


class TokenService {
  static setToken(token: string, persist: boolean = true): void {
    // Always set in sessionStorage for the current session/tab
    sessionStorage.setItem("token", token);
    
    // Only set in localStorage if persistence is requested (standard login)
    if (persist) {
      localStorage.setItem("token", token);
    }
    
    window.dispatchEvent(new Event("token-change"));
  }

  static getToken(): string | null {
    // Prioritize sessionStorage (impersonated or temporary session)
    // Fallback to localStorage (persisted admin/user session)
    return sessionStorage.getItem("token") || localStorage.getItem("token");
  }

  static decodeToken(): { id: string; role: string; memberId: string; phone?: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<any>(token);
      
      // Normalize memberId (handle both camelCase and snake_case, and userId which backend uses for Member_id)
      if (decoded) {
          if (!decoded.memberId && decoded.member_id) {
              decoded.memberId = decoded.member_id;
          }
          if (!decoded.memberId && decoded.userId && isNaN(Number(decoded.userId))) {
              // Ensure we don't accidentally grab a numeric ID, assuming member IDs are strings like "BMS000002"
              decoded.memberId = decoded.userId;
          }
          if (!decoded.memberId && typeof decoded.userId === 'string' && decoded.userId.startsWith('BMS')) {
              decoded.memberId = decoded.userId;
          } else if (!decoded.memberId && decoded.userId) {
               // Fallback: just use userId
               decoded.memberId = decoded.userId;
          }
      }

      return decoded;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }

  static getRole(): string | null {
    return this.decodeToken()?.role || null;
  }

  static getUserRole(): string | null {
    return this.getRole();
  }

  static getMemberId(): string | null {
    return this.decodeToken()?.memberId || null;
  }

  static getUserId(): string | null {
    return this.decodeToken()?.id || null;
  }

  static getPhone(): string | null {
    return this.decodeToken()?.phone || null;
  }

  static removeToken(): void {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    disconnectSocket();
    window.dispatchEvent(new Event("token-change"));
  }
}

export default TokenService;
