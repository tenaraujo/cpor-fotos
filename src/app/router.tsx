import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "@/features/home/HomePage";
import GroupPage from "@/features/albums/GroupPage";
import AlbumPage from "@/features/albums/AlbumPage";
import EventosPage from "@/features/eventos/EventosPage";
import IntegrantesPage from "@/features/integrantes/IntegrantesPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Grupo */}
        <Route
          path="/albums/:groupId"
          element={<GroupPage />}
        />

        {/* Álbum */}
        <Route
          path="/albums/:groupId/:albumId"
          element={<AlbumPage />}
        />

        {/* Reservado para futuras funcionalidades */}
        <Route
          path="/eventos"
          element={<EventosPage />}
        />

        <Route
          path="/integrantes"
          element={<IntegrantesPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}