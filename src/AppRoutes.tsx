import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";


const Home = lazy(() => import("./pages/home/home"));
const Login = lazy(() => import("./pages/auth/login/login"));
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
