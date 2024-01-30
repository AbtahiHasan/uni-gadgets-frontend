/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input } from "./ui/input";

const FilterUI = ({ setQuery, query }: any) => {
  return (
    <aside>
      <p className="mt-4">Price Range:</p>
      <div className="flex gap-1 items-center">
        <Input
          onChange={(e: any) =>
            setQuery({ ...query, minPrice: e.target.value })
          }
          className=""
          min={0}
          type="number"
          placeholder="min price"
        />
        <Input
          onChange={(e: any) =>
            setQuery({ ...query, maxPrice: e.target.value })
          }
          className=""
          min={0}
          type="number"
          placeholder="max price"
        />
      </div>
      <div>
        <p className="mt-4">By Release Date:</p>
        <Input
          onChange={(e: any) =>
            setQuery({ ...query, releaseDate: e.target.value })
          }
          type="date"
        />
      </div>
      <div>
        <p className="mt-4">By Brand:</p>
        <Input
          onChange={(e: any) => setQuery({ ...query, brand: e.target.value })}
          placeholder="by brand name"
        />
      </div>
      <div>
        <p className="mt-4">By Camera Resolution:</p>
        <Input
          onChange={(e: any) =>
            setQuery({ ...query, cameraResolution: parseInt(e.target.value) })
          }
          placeholder="by camera resolution"
          type="number"
        />
      </div>
      <div>
        <p className="mt-4">By Storage:</p>
        <Input
          onChange={(e: any) => setQuery({ ...query, storage: e.target.value })}
          placeholder="by storage"
          type="number"
        />
      </div>
      <div>
        <p className="mt-4"> By Model Number:</p>
        <Input
          onChange={(e: any) => setQuery({ ...query, model: e.target.value })}
          placeholder="by Model Number"
        />
      </div>
      <div>
        <p className="mt-4">By Category:</p>
        <Input
          onChange={(e: any) =>
            setQuery({ ...query, category: e.target.value })
          }
          placeholder="by Category"
        />
      </div>

      <div>
        <p className="mt-4"> By Operating System:</p>
        <div className="flex justify-start items-center gap-2">
          <input
            onChange={(e: any) =>
              setQuery({
                ...query,
                operatingSystem: e.target.checked ? "IOS" : "",
              })
            }
            className=""
            type="checkbox"
            id="iOS"
          />
          <label className="mr-auto" htmlFor="iOS">
            IOS
          </label>
        </div>
        <div className="flex justify-start items-center gap-2">
          <input
            onChange={(e: any) =>
              setQuery({
                ...query,
                operatingSystem: e.target.checked ? "Android" : "",
              })
            }
            className=""
            type="checkbox"
            id="Android"
          />
          <label className="mr-auto" htmlFor="Android">
            Android
          </label>
        </div>
        <div className="flex justify-start items-center gap-2 ">
          <input
            onChange={(e: any) =>
              setQuery({
                ...query,
                operatingSystem: e.target.checked ? "Windows" : "",
              })
            }
            className=""
            type="checkbox"
            id="Windows"
            name="Windows"
          />
          <label className="mr-auto" htmlFor="Windows">
            Windows
          </label>
        </div>
      </div>
      <div>
        <p className="mt-4"> By Connectivity:</p>
        <div className="flex justify-start items-center gap-2">
          <input
            onChange={(e: any) =>
              setQuery({
                ...query,
                connectivity: e.target.checked ? "Bluetooth" : "",
              })
            }
            className=""
            type="checkbox"
            id="Bluetooth"
          />
          <label className="mr-auto" htmlFor="Bluetooth">
            Bluetooth
          </label>
        </div>
        <div className="flex justify-start items-center gap-2">
          <input
            onChange={(e: any) =>
              setQuery({
                ...query,
                connectivity: e.target.checked ? "Wi-Fi" : "",
              })
            }
            className=""
            type="checkbox"
            id="Wi-Fi"
          />
          <label className="mr-auto" htmlFor="Wi-Fi">
            Wi-Fi
          </label>
        </div>
        <div className="flex justify-start items-center gap-2 ">
          <input
            onChange={(e: any) =>
              setQuery({
                ...query,
                connectivity: e.target.checked ? "USB-C" : "",
              })
            }
            className=""
            type="checkbox"
            id="USB-C"
          />
          <label className="mr-auto" htmlFor="USB-C">
            USB-C
          </label>
        </div>
      </div>
      <div>
        <p className="mt-4"> By Power Source:</p>
        <div className="flex justify-start items-center gap-2">
          <input
            onChange={(e: any) =>
              setQuery({
                ...query,
                powerSource: e.target.checked ? "Battery Powered" : "",
              })
            }
            className=""
            type="checkbox"
            id="battery-powered"
          />
          <label className="mr-auto" htmlFor="battery-powered">
            battery powered
          </label>
        </div>
        <div className="flex justify-start items-center gap-2 ">
          <input
            onChange={(e: any) =>
              setQuery({
                ...query,
                powerSource: e.target.checked ? "plug in" : "",
              })
            }
            className=""
            type="checkbox"
            id="plug-in"
          />
          <label className="mr-auto" htmlFor="plug-in">
            plug in
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FilterUI;
