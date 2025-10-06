export class SocketManager {
  private userIdToSocketIdMap: Map<string, string>;
  private socketIdToUserIdMap: Map<string, string>;

  constructor() {
    this.userIdToSocketIdMap = new Map<string, string>();
    this.socketIdToUserIdMap = new Map<string, string>();
  }

  addConnection(userId: string, socketId: string): void {
    this.userIdToSocketIdMap.set(userId, socketId);
    this.socketIdToUserIdMap.set(socketId, userId);
    console.log(`User ${userId} connected with socket ${socketId}`);
  }

  removeConnection(socketId: string): void {
    const userId = this.socketIdToUserIdMap.get(socketId);
    if (userId) {
      this.userIdToSocketIdMap.delete(userId);
      this.socketIdToUserIdMap.delete(socketId);
      console.log(`User ${userId} disconnected from socket ${socketId}`);
    }
  }

  getSocketId(userId: string): string | undefined {
    return this.userIdToSocketIdMap.get(userId);
  }

  getUserId(socketId: string): string | undefined {
    return this.socketIdToUserIdMap.get(socketId);
  }

  getAllConnectedUsers(): { userId: string; socketId: string }[] {
    const connectedUsers: { userId: string; socketId: string }[] = [];
    this.userIdToSocketIdMap.forEach((socketId, userId) => {
      connectedUsers.push({ userId, socketId });
    });
    return connectedUsers;
  }
}
