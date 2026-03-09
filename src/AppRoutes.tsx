import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";


const Home = lazy(() => import("./pages/home/Home"));
const Profile = lazy(() => import("./pages/porfile/Profile"));
const Dashboard = lazy(() => import("./pages/dashboards/Dashboard"));
const Aulas = lazy(() => import("./pages/aulas/Aulas"));
const Quadras = lazy(() => import("./pages/quadras/Quadras"));
const Alunos = lazy(() => import("./pages/alunos/Alunos"));
const Professores = lazy(() => import("./pages/professores/Professores"));
const Login = lazy(() => import("./pages/auth/login/Login"));
const Cadastro = lazy(() => import("./pages/auth/register/register"));
const Cadastro2 = lazy(() => import("./pages/auth/register/register2"));
const Cadastro3 = lazy(() => import("./pages/auth/register/register3"));
const Cadastro4 = lazy(() => import("./pages/auth/register/register4"));


function Loader() {
    return (
        <div className="flex items-center justify-center h-screen text-blue-700">
            <span className="animate-pulse text-xl font-semibold">Carregando...</span>
        </div>
    );
}
export default function AppRoutes() {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/aulas" element={<Aulas />} />
                    <Route path="/quadras" element={<Quadras />} />
                    <Route path="/alunos" element={<Alunos />} />
                    <Route path="/professores" element={<Professores />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/cadastro2" element={<Cadastro2 />} />
                    <Route path="/cadastro3" element={<Cadastro3 />} />
                    <Route path="/cadastro4" element={<Cadastro4 />} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </Suspense>

        </>
    );
}
