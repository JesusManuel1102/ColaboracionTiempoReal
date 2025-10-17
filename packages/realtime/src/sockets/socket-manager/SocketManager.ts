export class SocketManager {
  private userIdToSocketIdMap: Map<string, Set<string>>;
  private socketIdToUserIdMap: Map<string, string>;

  constructor() {
    this.userIdToSocketIdMap = new Map<string, Set<string>>();
    this.socketIdToUserIdMap = new Map<string, string>();
  }

  addConnection(userId: string, socketId: string): void {
    if (!this.userIdToSocketIdMap.has(userId)) {
      this.userIdToSocketIdMap.set(userId, new Set<string>());
    }
    this.userIdToSocketIdMap.get(userId)?.add(socketId);
    this.socketIdToUserIdMap.set(socketId, userId);
    console.log(`User ${userId} connected with socket ${socketId}`);
  }

  removeConnection(socketId: string): void {
    const userId = this.socketIdToUserIdMap.get(socketId);
    if (userId) {
      this.userIdToSocketIdMap.get(userId)?.delete(socketId);
      if (this.userIdToSocketIdMap.get(userId)?.size === 0) {
        this.userIdToSocketIdMap.delete(userId);
      }
      this.socketIdToUserIdMap.delete(socketId);
      console.log(`User ${userId} disconnected from socket ${socketId}`);
    }
  }

  getSocketIds(userId: string): Set<string> | undefined {
    return this.userIdToSocketIdMap.get(userId);
  }

  getUserId(socketId: string): string | undefined {
    return this.socketIdToUserIdMap.get(socketId);
  }

  getAllConnectedUsers(): { userId: string; socketId: string }[] {
    const connectedUsers: { userId: string; socketId: string }[] = [];
    this.userIdToSocketIdMap.forEach((socketIds, userId) => {
      socketIds.forEach(socketId => {
        connectedUsers.push({ userId, socketId });
      });
    });
    return connectedUsers;
  }
}
