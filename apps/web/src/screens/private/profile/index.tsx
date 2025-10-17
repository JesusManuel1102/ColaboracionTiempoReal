import { useGlobalStore } from "@/core/store/global_store";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Settings, LogOut } from "lucide-react";

const ProfileScreen = () => {
  const { user } = useGlobalStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Header y Foto de Perfil */}
        <div className="relative h-40 bg-gradient-to-r from-purple-500 to-indigo-600">
          <div className="absolute top-4 left-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 mb-6 text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer">
              <ArrowLeft />
              <p>Volver</p>
            </button>
          </div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            {user?.avatarUrl ? (
              <img
                className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md"
                src={user?.avatarUrl || "https://via.placeholder.com/150"}
                alt="Profile Avatar"
              />
            ) : (
              <span className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md bg-gradient-to-r from-purple-500 to-indigo-600 inline-flex text-center items-center justify-center text-4xl text-white font-bold">
                {user?.username?.[0] || "U"}
              </span>
            )}
          </div>
        </div>

        {/* Información Básica */}
        <div className="pt-16 pb-6 px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold">
            {user?.username || "Usuario Desconocido"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {user?.email || "correo@ejemplo.com"}
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-md mx-auto">
            {user?.bio ||
              "¡Hola! Este es mi perfil. Aún no he añadido una biografía."}
          </p>
        </div>

        {/* Sección de Estadísticas */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              120
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              Votos Realizados
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              15
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              Salas Creadas
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              300
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              Participaciones
            </span>
          </div>
        </div>

        {/* Menú de Opciones */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-xl font-semibold mb-4">Opciones del Perfil</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200">
                <Edit className="mr-3" />
                Editar Perfil
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200">
                <Settings className="mr-3" />
                Configuración de Cuenta
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-md transition-colors duration-200">
                <LogOut className="mr-3" />
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
