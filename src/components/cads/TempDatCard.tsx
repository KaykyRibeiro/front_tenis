import { CloudSun, MapPin, Calendar, Clock, Droplets } from "lucide-react";
import { useEffect, useState } from "react";

export default function TempDatCard() {
  const [weather, setWeather] = useState<any>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Guaratingueta,BR&units=metric&appid=${import.meta.env.VITE_WEATHER_KEY}&lang=pt_br`,
      );
      const data = await res.json();
      setWeather(data);
    }

    fetchWeather();

    const interval = setInterval(fetchWeather, 3600000); // 1 hora

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-lg bg-linear-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950 p-6 rounded-3xl shadow-xl shadow-primary-color/5 border border-white/50 dark:border-white/5 relative overflow-hidden group">
      {/* Elemento de background decorativo */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500"></div>

      <div className="flex flex-row items-center justify-start w-full relative z-10 mb-8 gap-4">
        <div className="p-3 bg-orange-100 dark:bg-orange-950/30 rounded-2xl">
          <CloudSun
            className="w-14 h-14 text-orange-500 dark:text-orange-400 drop-shadow-sm"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-light text-gray-900 dark:text-gray-100">
              {weather?.main?.temp.toFixed(0)}°
            </span>
            <span className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-1">
              C
            </span>
          </div>
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-1">
            {weather?.weather?.[0]?.description?.replace(/^./, (c: string) =>
              c.toUpperCase(),
            )}
          </h2>
          <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 gap-1">
            <MapPin size={14} />
            <p>{weather?.name}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-full bg-primary-color/90 backdrop-blur-sm p-4 text-white rounded-2xl shadow-inner relative z-10">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="opacity-80" />
          <p className="font-medium text-sm">
            {time
              .toLocaleDateString("pt-BR", { weekday: "long" })
              .replace(/^./, (c) => c.toUpperCase())}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} className="opacity-80" />
          <p className="font-medium text-sm">
            {time.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full">
          <Droplets size={16} fill="white" className="opacity-90" />
          <p className="font-semibold text-sm">{weather?.main?.humidity}%</p>
        </div>
      </div>
    </div>
  );
}
