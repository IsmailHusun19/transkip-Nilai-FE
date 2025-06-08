import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./script/pages/Login";
import Home from "./script/pages/Home";
import ProtectedRoute from "./script/config/Protect";
import Dashboard from "./script/pages/Admin/Dashboard";
import Pelatihan from "./script/pages/Admin/Pelatihan";
import TambahDataPelatihan from "./script/pages/Admin/TambahDataPelatihan";
import EditDataPelatihan from "./script/pages/Admin/EditDataPelatihan";
import Periode from "./script/pages/Admin/Periode";
import TambahDataPeriode from "./script/pages/Admin/TambahDataPeriode";
import EditDataPeriode from "./script/pages/Admin/EditDataPeriode";
import Peserta from "./script/pages/Admin/Peserta";
import DetailPelatihan from "./script/pages/Admin/DetailPelatihan";
import TambahPesertaPelatihan from "./script/pages/Admin/TambahPersertaPelatihan";
import Penilaian from "./script/pages/Admin/Penilaian";
import DetailPenilaian from "./script/pages/Admin/DetailPenilaian";
import MengelolaPenilaian from "./script/pages/Admin/MengelolaPenilaian";
import TambahDataPenilaian from "./script/pages/Admin/TambahDataPenilaian";
import Jurusan from "./script/pages/Admin/Jurusan";
import TambahDataJurusan from "./script/pages/Admin/TambahDataJurusan";
import EditDataJurusan from "./script/pages/Admin/EditDataJurusan";
import EditDataPenilaian from "./script/pages/Admin/EditDataPenilaian";
import TambahDataPeserta from "./script/pages/Admin/TambahPeserta";
import EditDataPeserta from "./script/pages/Admin/EditDataPeserta";
import Instruktur from "./script/pages/Admin/Instruktur";
import TambahDataInstruktur from "./script/pages/Admin/TambahDataInstruktur";
import EditDataInstruktur from "./script/pages/Admin/EditDataInstruktur";
import ErrorPage from "./script/pages/ErrorPage";
import StudiPembelajaran from "./script/pages/StudiPembelajaran";
import DetailStudiPembelajaran from "./script/pages/DetailStudiPembelajaran";
import PenilaianTranskripNilai from "./script/pages/Instruktur.jsx/penilaianTranskripNilai";
import StudiPembelajaranInstruktur from "./script/pages/Instruktur.jsx/StudiPembelajaranInstruktur";
import DetailStudiPembelajaranInstruktur from "./script/pages/Instruktur.jsx/DetailStudiPembelajaranInstruktur";
import TranskripNilaiInstruktur from "./script/pages/Instruktur.jsx/TranskripNilaiInstruktur";
import TranskripNilai from "./script/pages/Peserta/TranskripNilai";
import DetailTranskripNilaiInstruktur from "./script/pages/Instruktur.jsx/DetailTranskripNilaiInstruktur";
import DetailPenilaianTranskripNilaiInstruktur from "./script/pages/Instruktur.jsx/DetailPenilaianTranskripNilaiInstruktur";
import DetailPenilaianTranskripNilai from "./script/pages/Peserta/DetailPenilaianTranskripNilai";
import PenilaianDetailPelatihan from "./script/pages/Admin/PenilaianDetailPelatihan";
import Profile from "./script/pages/Admin/Profile";
import HalamanUtama from "./script/pages/HalamanUtama";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<HalamanUtama />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["Peserta", "Instruktur"]}>
                <HalamanUtama/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pelatihan"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Pelatihan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pelatihan/tambah"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <TambahDataPelatihan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pelatihan/edit/:idPelatihan"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <EditDataPelatihan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/periode"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Periode />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/periode/tambah"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <TambahDataPeriode />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/periode/edit/:idPeriode"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <EditDataPeriode />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/peserta"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Peserta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/detail-pelatihan/:idPelatihan"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DetailPelatihan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tambah-pelatihan/:idPelatihan"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <TambahPesertaPelatihan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/penilaian"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Penilaian />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/detail-penilaian/:idPenilaian"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DetailPenilaian />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/detail-penilaian/mengelola-penilaian/:idPenilaian"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <MengelolaPenilaian />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/penilaian/tambah"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <TambahDataPenilaian />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/penilaian/edit/:idPenilaian"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <EditDataPenilaian />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jurusan"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Jurusan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jurusan/tambah"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <TambahDataJurusan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jurusan/edit/:idJurusan"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <EditDataJurusan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/peserta/tambah"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <TambahDataPeserta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/peserta/edit/:idPeserta"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <EditDataPeserta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/instruktur"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Instruktur />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/instruktur/tambah"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <TambahDataInstruktur />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/instruktur/edit/:idInstruktur"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <EditDataInstruktur />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studi-pembelajaran"
            element={
              <ProtectedRoute allowedRoles={["Peserta"]}>
                <StudiPembelajaran />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studi-pembelajaran-instruktur"
            element={
              <ProtectedRoute allowedRoles={["Instruktur"]}>
                <StudiPembelajaranInstruktur />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detail-studi-pembelajaran/:idPelatihan"
            element={
              <ProtectedRoute allowedRoles={["Peserta"]}>
                <DetailStudiPembelajaran />
              </ProtectedRoute>
            }
          />

          <Route
            path="/detail-studi-pembelajaran-instruktur/:idPelatihan"
            element={
              <ProtectedRoute allowedRoles={["Instruktur"]}>
                <DetailStudiPembelajaranInstruktur />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transkrip-nilai"
            element={
              <ProtectedRoute allowedRoles={["Peserta"]}>
                <TranskripNilai />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transkrip-nilai-instruktur"
            element={
              <ProtectedRoute allowedRoles={["Instruktur"]}>
                <TranskripNilaiInstruktur />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detail-transkrip-nilai-instruktur/:idPelatihan"
            element={
              <ProtectedRoute allowedRoles={["Instruktur"]}>
                <DetailTranskripNilaiInstruktur />
              </ProtectedRoute>
            }
          />
          <Route
            path="/penilaian-transkrip-nilai/:idPenilaian/:idPelatihan/:idPeserta"
            element={
              <ProtectedRoute allowedRoles={["Instruktur"]}>
                <PenilaianTranskripNilai />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transkrip-nilai-admin/:idPenilaian/:idPelatihan/:idPeserta"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <PenilaianDetailPelatihan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/penilaian-detail-transkrip-nilai-instruktur/:idPelatihan/:idPeserta"
            element={
              <ProtectedRoute allowedRoles={["Instruktur"]}>
                <DetailPenilaianTranskripNilaiInstruktur />
              </ProtectedRoute>
            }
          />
          <Route
            path="/penilaian-detail-transkrip-nilai/:idPelatihan"
            element={
              <ProtectedRoute allowedRoles={["Peserta"]}>
                <DetailPenilaianTranskripNilai />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
