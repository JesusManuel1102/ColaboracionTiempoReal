import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useVotingRoom } from "@/features/voting-room/hooks/useVotingRoom";
import { useEffect } from "react";

const RoomScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { getRoomById } = useVotingRoom();

  useEffect(() => {
    getRoomById.setUuid(params.uuid!);
  }, [params.uuid, getRoomById])

  return (
    <div className="flex flex-1 overflow-hidden">
      <section className="flex-1 bg-blue-300 h-full overflow-y-auto">
        contenido
      </section>
      <section className="flex-1 bg-green-300 h-full overflow-y-auto">
        opciones y chat
      </section>
    </div>
  );
};

export default RoomScreen;
