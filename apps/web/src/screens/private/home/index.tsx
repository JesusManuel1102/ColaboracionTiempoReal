import { Link } from "react-router-dom";
import { useProfile } from "../../../features/user/hooks/useProfile";
import useSocket from "../../../infraestructure/sockets/hook/useSocket";
import {
  CheckCircle2,
  Clock,
  LogOut,
  Plus,
  Users,
  Vote,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../features/auth/basic/hooks/useAuth";
import { Button } from "../../../components/shared/Botton";

const Home = () => {
  useSocket();
  const { data, isLoading, isError, error } = useProfile();
  const { handleLogout } = useAuth();

  console.log(data);

  const [activeRooms] = useState<
    {
      id: number;
      name: string;
      code: string;
      status: "active" | "closed";
      participants: number;
      votingActive: boolean;
    }[]
  >([
    {
      id: 1,
      name: "Reunión de Equipo",
      code: "ABC123",
      status: "active",
      participants: 8,
      votingActive: true,
    },
    {
      id: 2,
      name: "Planning Q2",
      code: "DEF456",
      status: "closed",
      participants: 12,
      votingActive: false,
    },
    {
      id: 3,
      name: "Retrospectiva Sprint",
      code: "GHI789",
      status: "active",
      participants: 5,
      votingActive: true,
    },
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return (
    <div>
      {/* Header */}
      <header className="border-b border-border border-gray-500">
        <div className="mx-auto px-16 py-2 flex items-center justify-between">
          <Link to={"/"} className="flex items-center justify-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-gray-800 flex items-center justify-center shadow-lg shadow-primary/20">
              <Vote className="size-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">VoteSync</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:shadow hover:shadow-gray-400 cursor-pointer">
              <div className="size-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-sm font-semibold text-white">JP</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {data?.username || "User"}
              </span>
            </div>
            <Button
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground px-3 py-2 hover:shadow hover:shadow-gray-400 cursor-pointer">
              <LogOut className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-16 py-8 min-h-max bg-gray-400">
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
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Mis Salas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    {/* <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
                    onClick={() => router.push(`/room/${room.code}`)}>
                    Entrar a la Sala
                  </Button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
