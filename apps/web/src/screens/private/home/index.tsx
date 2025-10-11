import { Button } from "../../../components/shared/Botton";
import { useGlobalStore } from "../../../core/store/global_store";
import { useVotingRoom } from "../../../features/voting-room/hooks/useVotingRoom";
import { Plus, Users } from "lucide-react";

const Home = () => {
  const { user } = useGlobalStore();
  const { create, votingRoom } = useVotingRoom();

  console.log(user)

  const createRoom = (username: string, uuid: string) => {
    create.createVotingRoom({
      name: "Sala de votación 1 prueba",
      description: "Sala de votación para la primera reunión prueba",
      createdBy: uuid,
      creatorName: username,
    });
  }

  // getVotingRoom("de302235-f32b-4e34-b500-4ceac04102b5");

  if (votingRoom.isLoading) {
    return <div>Cargando...</div>;
  }

  if (votingRoom.isError) {
    return <div>Error: {votingRoom.error?.message || "Error desconocido"}</div>;
  }

  // console.log(votingRoom.data)

  return (
    <div className="h-full w-full p-16">
      <div>
        <div>
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bienvenido de vuelta
            </h1>
            <p className="text-muted-foreground">
              Gestiona tus salas de votación y participa en decisiones
              colaborativas
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center max-w-xl align-middle m-auto bg-red">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Plus className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-foreground">Crear Nueva Sala</h3>
                      <p className="text-muted-foreground">
                        Inicia una nueva sesión de votación
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer">
              <div>
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Users className="size-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-foreground">Unirse a Sala</h3>
                    <p className="text-muted-foreground">
                      Ingresa con un código de sala
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={() => createRoom(user?.username || "", user?.userId || "")}>
              Crear Sala
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Mis Salas</h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeRooms.map((room) => (
              <div
                key={room.id}
                className="bg-card border-border hover:border-primary/30 transition-colors">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg text-foreground">{room.name}</h3>
                    {room.status === "active" ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-accent">
                        <div className="size-2 rounded-full bg-accent animate-pulse" />
                        Activa
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <Clock className="size-3" />
                        Cerrada
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">Código: {room.code}</p>
                </div>
                <div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Users className="size-4" />
                        Participantes
                      </span>
                      <span className="font-medium text-foreground">
                        {room.participants}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Estado de votación
                      </span>
                      {room.votingActive ? (
                        <span className="flex items-center gap-1 text-accent font-medium">
                          <CheckCircle2 className="size-4" />
                          En curso
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <XCircle className="size-4" />
                          Inactiva
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
