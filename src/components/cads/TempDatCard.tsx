import { CloudRain, CloudSun } from "lucide-react";

export default function TempDatCard() {
  return (
    <div className="flex flex-col w-8/12 h-auto bg-white dark:bg-black-smooth p-4 rounded-lg shadow-lg shadow-primary-color/20">
      <div className="flex flex-row items-center justify-start w-full h-full mb-4">
        <div>
          <CloudSun className="w-auto h-20 text-black dark:text-white"/>
        </div>
        <div className="flex flex-col ">
          <p className="text-2xl font-normal text-gray-800 dark:text-gray-200 px-4">22° C</p>
          <h2 className="text-3xl font-normal text-gray-800 dark:text-gray-200 px-4">Sol entre nuvens</h2>
          <p className="text-lg font-normal text-gray-600 dark:text-gray-200 px-4">Guaratinguetá - SP</p>
        </div>

      </div>
      <div className="flex flex-row justify-between w-full bg-primary-color p-2 text-white rounded-2xl px-4">
        <p className="font-light text-lg">Terça-feira</p>
        <p className="font-light text-lg">11:00</p>
        <div className="flex flex-row">
          <CloudRain />
          <p>78%</p>
        </div>
      </div>
    </div>
  );
}