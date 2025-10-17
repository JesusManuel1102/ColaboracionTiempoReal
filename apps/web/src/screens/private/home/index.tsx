import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useGlobalStore } from "../../../core/store/global_store";
import { Plus, Users, Copy, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/shared/Label";
import { useForm } from "@/hooks/formulary/useForm";
import { useVotingRoom } from "@/features/voting-room/hooks/useVotingRoom";
import imagen from "../../../assets/imagen-para-tarjeta-2.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useGlobalStore();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const { create, getAllRooms } = useVotingRoom();
  const navigate = useNavigate();

  useEffect(() => {
    if (create.isSuccess) {
      setIsCreateDialogOpen(false);
    }
  }, [create.isSuccess]);

  const { FormData, handleSubmit, handleChange, FormDataError } = useForm({
    name: "",
    description: "",
    createdBy: user?.userId,
    creatorName: user?.username,
  });

  return (
    <div className="h-full w-full px-12 pt-7">
      <div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {/* Welcome Section */}
          <div className="mb-3">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.username || "user"}
            </h1>
            <p className="text-muted-foreground">
              Here you can manage your voting rooms and participate in
              collaborative decisions
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-5">
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center justify-center gap-4 bg-gray-100 hover:bg-gray-200 hover:outline-1 ransition-colors cursor-pointer rounded-md p-3 h-16">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Plus className="size-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">
                      Crear nueva sala
                    </CardTitle>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    Create New Room
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Enter a name for your voting room
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <form
                    onSubmit={handleSubmit(() =>
                      create.createVotingRoom({
                        name: FormData.name,
                        description: FormData.description,
                        createdBy: FormData.createdBy ?? "",
                        creatorName: FormData.creatorName ?? "",
                      })
                    )}
                    className="flex flex-col gap-2">
                    <Label
                      id="name"
                      name="name"
                      label="Room Name"
                      typeInput="text"
                      placeholder="Work Meeting"
                      value={FormData.name}
                      onChange={handleChange}
                      error={FormDataError.name}
                      className="outline-0 w-full"
                    />
                    <Label
                      id="description"
                      name="description"
                      label="Description"
                      placeholder="Discussion of test results # 1"
                      value={FormData.description}
                      onChange={handleChange}
                      error={FormDataError.description}
                      className="outline-0 w-full"
                    />
                    <Button
                      type="submit"
                      className="bg-gray-900 text-white p-2 rounded-md mt-3 mb-4 cursor-pointer hover:bg-primary/90 transition-colors">
                      {create.isPending
                        ? "Creating Room..."
                        : create.isSuccess
                          ? "Room Created ✓"
                          : "Create Room"}
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center justify-center gap-4 transition-colors cursor-pointer rounded-md p-3 h-16 bg-gray-100 hover:bg-gray-200 hover:outline-1">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="size-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">
                      Ingresar a una sala
                    </CardTitle>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    Join Room
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Enter the code of the room you want to join
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsJoinDialogOpen(false)}
                    className="border-border text-foreground">
                    Cancel
                  </Button>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Join
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-3">Salas disponibles</h2>
          <section>
            <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
              {getAllRooms.data?.map((room: any) => (
                <Card
                  key={room.props.uuid}
                  className="bg-card border-border relative p-0 gap-2">
                  <div>
                    <img
                      src={imagen}
                      alt="Imagen de prueba para la tarjeta de presentacion de la salas"
                      className="w-full h-40 rounded-md object-cover relative"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 cursor-pointer">
                      <Settings2 className="h-2 w-2" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-start absolute top-2 left-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        room.props.statusRoom
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}>
                      {room.props.statusRoom ? "Activa" : "Inactiva"}
                    </span>
                  </div>
                  <CardDescription className="text-muted-foreground px-3 pb-1 text-sm inline-flex flex-col items-start gap-2">
                    <h2 className="text-foreground text-xl font-semibold">
                      {room.props.name}
                    </h2>
                    <p>{room.props.description}</p>
                    <div className="space-y-2 w-full text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Participantes</span>
                        </div>
                        <span className="font-medium text-foreground">
                          {room.props.participants?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="w-4 h-4 mr-2 flex items-center justify-center">
                            <span
                              className={`block w-2 h-2 rounded-full ${
                                room.props.votingActive
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}></span>
                          </span>
                          <span>Estado de votación</span>
                        </div>
                        <span
                          className={`font-medium ${
                            room.props.votingActive
                              ? "text-green-600"
                              : "text-muted-foreground"
                          }`}>
                          {room.props.votingActive ? "En curso" : "Inactiva"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 w-full grid grid-cols-[120px_1fr] gap-2 mt-1">
                      <Button
                        variant="secondary"
                        className="w-full cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            room.props.codeInvitation
                          );
                        }}>
                        <Copy className="h-2 w-2" />
                        <p>Codigo</p>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/room/${room.props.uuid}`)}
                        className="w-full cursor-pointer hover:bg-gray-200">
                        Entrar a la Sala
                      </Button>
                    </div>
                  </CardDescription>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
