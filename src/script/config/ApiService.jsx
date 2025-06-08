import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetLaporanJumlah = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/dashboard/counts`, {
      withCredentials: true
    })
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const PostUsers = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/register', data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

const Apilogin = async (data) => {
    try {
      const response = await axios.post(`http://localhost:3000/login`, data, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetPesertaById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/peserta/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetInstrukturById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/instruktur/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const Logout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/logout', {}, {
        withCredentials: true
      })      
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const PutDataUser = async (data) => {
    try {
      const response = await axios.put('http://localhost:3000/user', data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  
  }

  const PutDataUserAdmin = async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:3000/admin-user/${id}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  
  }

  const GetPeriode = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/periode`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetPeriodeById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/periode/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const PostPeriode = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/periode', data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  
  }

  const PutPeriode = async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:3000/periode/${id}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const GetJurusan = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/jurusan`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetJurusanById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/jurusan/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const PostJurusan = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/jurusan', data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  
  }

  const PutJurusan = async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:3000/jurusan/${id}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  const GetInstruktur = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/instruktur`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetPeserta = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/peserta`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const PostPelatihan = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/pelatihan', data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  
  }

  const GetPelatihan = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pelatihan`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetPelatihanById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/pelatihan/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const PutPelatihan = async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:3000/pelatihan/${id}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const DeletePelatihan = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/pelatihan/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const DeletePeriode = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/periode/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteJurusan = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/jurusan/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteInstruktur = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/user/instruktur/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const DeletePeserta = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/user/peserta/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const PostPesertaPelatihan = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/peserta-pelatihan', data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  
  }

  const GetAllPesertaPelatihanById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/peserta-pelatihan/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetPenilaian = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/penilaian`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetPenilaianById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/penilaian/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const PostPenilaian = async (data) => {
    try {
      const response = await axios.post(`http://localhost:3000/penilaian`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  
  }

  const PutDetailPenilaian = async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:3000/detail-penilaian/${id}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const DeletePenilaian = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/penilaian/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const PutPenilaian = async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:3000/penilaian/${id}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const GetPelatihanByPeserta = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pelatihan-peserta`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetPelatihanByInstruktur = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pelatihan-instruktur`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  const GetPelatihanByPesertaById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/pelatihan-peserta/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetPelatihanByInstrukrurById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/pelatihan-instruktur/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

    const GetPenilaianPelatihanPesertaById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/penilaian-peserta/${id}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const PostPenilaianPeserta = async (data) => {
    try {
      const response = await axios.post(`http://localhost:3000/penilaian-peserta`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return undefined;
    }
  
  }

  const PutPenilaianPeserta = async (data) => {
    try {
      const response = await axios.put(`http://localhost:3000/penilaian-peserta`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const GetPenilaianPesertaById = async (idPeserta, idPelatihan) => {
    try {
      const response = await axios.get(`http://localhost:3000/penilaian-peserta/${idPeserta}/${idPelatihan}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetPelatiahnPenilaianPesertaByIdInstruktur = async (idPeserta, idPelatihan) => {
    try {
      const response = await axios.get(`http://localhost:3000/pelatihan-penilaian-instruktur/${idPeserta}/${idPelatihan}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const GetPelatiahnPenilaianPesertaByIdPeserta = async (idPelatihan) => {
    try {
      const response = await axios.get(`http://localhost:3000/pelatihan-penilaian-peserta/${idPelatihan}`, {
        withCredentials: true
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const PutPeringkatPeserta = async (idPelatihan, data) => {
    const peringkatList = {
      peringkatList : data
    }
    try {
      const response = await axios.put(`http://localhost:3000/penilaian/peringkat/${idPelatihan}`, peringkatList, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export {PostUsers, DeletePeserta, DeleteInstruktur, DeleteJurusan, DeletePeriode, GetPenilaianPelatihanPesertaById, GetPelatiahnPenilaianPesertaByIdPeserta, GetPelatiahnPenilaianPesertaByIdInstruktur, GetPelatihanByInstrukrurById, GetPelatihanByInstruktur, PutPeringkatPeserta, PutPenilaianPeserta, GetPenilaianPesertaById, PostPenilaianPeserta, GetAllPesertaPelatihanById, GetPelatihanByPesertaById, GetPelatihanByPeserta, GetInstrukturById, GetLaporanJumlah, PutDataUserAdmin, GetPesertaById, Apilogin, GetUser, Logout, PutDataUser, GetPeriode,  GetJurusan, GetInstruktur, PostPelatihan, GetPelatihan, GetPelatihanById, PutPelatihan, DeletePelatihan, PostPeriode, GetPeriodeById, PutPeriode, GetPeserta, PostPesertaPelatihan, GetPenilaian, GetPenilaianById, PutDetailPenilaian, PostPenilaian, DeletePenilaian, PostJurusan, GetJurusanById, PutJurusan, PutPenilaian  }