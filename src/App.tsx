import { useEffect, useState } from "react";
// import { CubicEquation } from "./components/CubicEquation";
// import { CubicGraph } from "./components/CubicGraph";
// import { CubicHistory } from "./components/CubicHistory";
// import { CubicInput } from "./components/CubicInput";
// import { CubicTable } from "./components/CubicTable";

export const App = () => {
  const [aValue, setA] = useState<number | string>('');
  const [bValue, setB] = useState<number | string>('');
  const [cValue, setC] = useState<number | string>('');
  const [dValue, setD] = useState<number | string>('');
  let [results, setResults] = useState({ r1: '', r2: '', r3: '', discriminant: '', pValue: '', qValue: '' })

  useEffect(() => {

    const a = Number(aValue);
    const b = Number(bValue);
    const c = Number(cValue);
    const d = Number(dValue);

    if (aValue === '' || bValue === '' || cValue === '' || dValue === '') {
      return;
    }

    const eps = 1e-12;

    if (Math.abs(a) < eps) { /* Guarding against quadratics and linear equations. All cofficient letters have been shifted one over to the right because we are taking values from the form of a cubic equation */
      setResults({ ...results, qValue: '', pValue: '' });
      if (Math.abs(b) > eps) { /* Quadratic solver */

        const discriminant = c * c - 4 * b * d;

        if (Math.abs(discriminant) < eps) {
          const rootOne = -c / (2 * b);
          setResults({ ...results, r1: `Double Root = ${rootOne.toFixed(6)}`, r2: '', r3: '', discriminant: `${discriminant.toFixed(6)}`, pValue: '', qValue: '' });
        } else if (discriminant > 0) {
          const rootOne = (-c + Math.sqrt(discriminant)) / (2 * b);
          const rootTwo = (-c - Math.sqrt(discriminant)) / (2 * b);
          setResults({ ...results, r1: `Root 1 = ${rootOne.toFixed(6)}`, r2: `Root 2 = ${rootTwo.toFixed(6)}`, r3: '', discriminant: `${discriminant.toFixed(6)}`, pValue: '', qValue: '' });
        } else {
          const realNum = -c / (2 * b)
          const imagNum = (Math.sqrt(Math.abs(discriminant))) / (2 * b)
          setResults({ ...results, r1: `${realNum.toFixed(6)} + ${imagNum.toFixed(6)}i`, r2: `${realNum.toFixed(6)} - ${imagNum.toFixed(6)}i`, r3: '', discriminant: `${discriminant.toFixed(6)}`, pValue: '', qValue: '' });
        }
      } else if (Math.abs(c) > eps) { /* Linear Solver */
        const rootOne = -d / c;
        setResults({ ...results, r1: `Root 1 = ${rootOne.toFixed(6)}`, r2: '', r3: '', discriminant: '', pValue: '', qValue: '' });
      } else {
        if (Math.abs(d) < eps) {
          setResults({ ...results, r1: 'Infinite solutions', r2: 'Infinite solutions', r3: 'Infinite solutions', discriminant: '', pValue: '', qValue: '' });
        } else {
          setResults({ ...results, r1: 'No Solutions', r2: 'No Solutions', r3: 'No Solutions', discriminant: '', pValue: '', qValue: '' });
        }
      }
    } else { /* Cubic solver */
      const p = (3 * a * c - b * b) / (3 * a * a);
      const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
      const shift = b / (3 * a);
      const discriminant = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);

      if (discriminant < -eps) { /* Trigonometric Method */
        const acosX = -q / (2 * Math.sqrt(-((p / 3) ** 3)));
        const limiter = Math.max(-1, Math.min(1, acosX));
        const theta = (1 / 3) * Math.acos(limiter);

        const g = 2 * Math.sqrt(Math.max(0, -p / 3));

        const rootOne = g * Math.cos(theta) - shift;
        const rootTwo = g * Math.cos(theta + (2 * Math.PI) / 3) - shift;
        const rootThree = g * Math.cos(theta + (4 * Math.PI) / 3) - shift;

        setResults({ ...results, r1: `Root 1 = ${rootOne.toFixed(6)}`, r2: `Root 2 = ${rootTwo.toFixed(6)}`, r3: `Root 3 = ${rootThree.toFixed(6)}`, discriminant: `${discriminant.toFixed(6)}`, pValue: `${p.toFixed(6)}`, qValue: `${q.toFixed(6)}` });
      } else {
        const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
        const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
        const n = -((u + v) / 2);
        const m = (Math.sqrt(3) * (u - v)) / 2;

        if (discriminant > eps) { /* Cardano's method */
          const rootOne = u + v - shift;
          const realNum = n - shift;
          const imagNum = m;

          setResults({ ...results, r1: `Root 1 = ${rootOne.toFixed(6)}`, r2: `Root 2 = ${realNum.toFixed(6)} + ${imagNum.toFixed(6)}i`, r3: `Root 3 = ${realNum.toFixed(6)} - ${imagNum.toFixed(6)}i`, discriminant: `${discriminant.toFixed(6)}`, pValue: `${p.toFixed(6)}`, qValue: `${q.toFixed(6)}` });
        } else { /* Cardano's Method */
          if (Math.abs(p) < eps && Math.abs(q) < eps) {
            setResults({ ...results, r1: `Root 1 = ${(-shift).toFixed(6)}`, r2: `Root 2 = ${(-shift).toFixed(6)}`, r3: `Root 3 = ${(-shift).toFixed(6)}`, discriminant: `${discriminant.toFixed(6)}`, pValue: `${p.toFixed(6)}`, qValue: `${q.toFixed(6)}` });
          } else {
            const singleRoot = u + v - shift;
            const doubleRoot = n - shift;
            setResults({ ...results, r1: `Root 1 = ${singleRoot.toFixed(6)}`, r2: `Double Root = ${doubleRoot.toFixed(6)}`, r3: '', discriminant: `${discriminant.toFixed(6)}`, pValue: `${p.toFixed(6)}`, qValue: `${q.toFixed(6)}` });
          }
        }
      }
    }
  }, [aValue, bValue, cValue, dValue]);

  return (
    <div className="min-h-screen bg-[#f4f7f6] p-5 flex flex-col items-center font-sans text-[#333]">
      <h1 className="text-2xl font-bold my-1 text-center">Cubic Solver</h1>
      <h5 className="text-base font-normal text-[#666] max-w-[600px] mb-5 text-center leading-tight">
        Welcome to a cubic solver, you will probably find many more that may or may not be much better than this one. Please waste your time here.
      </h5>

      <div className="flex flex-col md:flex-row items-start gap-8 bg-white p-[30px] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-fit mx-auto my-5">

        <div className="flex flex-col min-w-[250px]">
          <form className="flex flex-col">

            <div className="flex flex-col border-b-2 border-gray-100 pb-5 mb-5">
              <label className="text-[0.9rem] font-bold mb-1 text-[#555]">a-value:</label>
              <input
                type="number"
                step="any"
                value={aValue}
                onChange={(e) => {
                  const val = e.target.value;
                  setA(val === '' ? '' : Number(val))
                }}
                required
                className="p-2 mb-4 border border-gray-300 rounded text-base focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <label className="text-[0.9rem] font-bold mb-1 text-[#555]">b-value:</label>
              <input
                type="number"
                step="any"
                value={bValue}
                onChange={(e) => {
                  const val = e.target.value;
                  setB(val === '' ? '' : Number(val))
                }}
                required
                className="p-2 mb-4 border border-gray-300 rounded text-base focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <label className="text-[0.9rem] font-bold mb-1 text-[#555]">c-value:</label>
              <input
                type="number"
                step="any"
                value={cValue}
                onChange={(e) => {
                  const val = e.target.value;
                  setC(val === '' ? '' : Number(val))
                }}
                required
                className="p-2 mb-4 border border-gray-300 rounded text-base focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <label className="text-[0.9rem] font-bold mb-1 text-[#555]">d-value:</label>
              <input
                type="number"
                step="any"
                value={dValue}
                onChange={(e) => {
                  const val = e.target.value;
                  setD(val === '' ? '' : Number(val))
                }}
                required
                className="p-2 mb-4 border border-gray-300 rounded text-base focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div className="flex flex-col gap-3 mb-5">
              <input value={results.r1} type="text" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
              <input value={results.r2} type="text" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
              <input value={results.r3} type="text" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
              <input value={results.discriminant} type="text" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
              <input value={results.pValue} type="text" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
              <input value={results.qValue} type="text" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
            </div>

            {/* <input
              type="submit"
              value="Save"
              className="bg-[#3498db] hover:bg-[#2980b9] text-white font-bold p-3 rounded cursor-pointer transition-colors duration-300"
            /> */}
          </form>
        </div>
      </div>
    </div>
  )
};