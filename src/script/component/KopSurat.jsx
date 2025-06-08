import Logo from "../../assets/BBPVP.jpg";

const KopSurat = () => {
  return (
    <div className="hidden print:block w-full">
    <div className="flex justify-between items-center w-full">
      <img className="w-20" src={Logo} alt="" />
      <div className=" text-center w-full">
        <h2 className="font-normal text-sm">
        KEMENTERIAN KETENAGAKERJAAN REPUBLIK INDONESIA
        </h2>
        <h2 className="font-medium text-base">
        DIREKTORAT JENDRAL
        </h2>
        <h2 className="font-medium text-base">
        PEMBINAAN PELATIHAN VOKASI DAN PRODUKTIVITAS
        </h2>
        <h1 className="font-bold text-xl">
        BALAI BESAR PELATIHAN VOKASI DAN PRODUKTIFITAS
        </h1>
        <p className="text-xs">
        Jl. Raya Pandeglang KM 3 Serang 42151 Banten, Telp (0254) 200160 Fax (0253) 214641
        </p>
        <p className="text-xs">
        Laman:http://naker.go.id
        </p>
      </div>
    </div>
    <div className="w-full mt-2">
      <div className="border-t-4 border-black"></div>
      <div className="border-t border-black mt-1"></div>
    </div>
  </div>
  );
};

export default KopSurat;