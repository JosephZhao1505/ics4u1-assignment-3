import { useEffect, useState } from "react";
import { CubicEquation } from "./components/CubicEquation";
import { CubicGraph } from "./components/CubicGraph";
import { CubicHistory } from "./components/CubicHistory";
import { CubicInput } from "./components/CubicInput";
import { CubicTable } from "./components/CubicTable";

export const App = () => {
  const [aValue, setA] = useState<number | string>('');
  const [bValue, setB] = useState<number | string>('');
  const [cValue, setC] = useState<number | string>('');
  const [dValue, setD] = useState<number | string>('');
  let [results, setResults] = useState({ r1: '', r2: '', r3: '', discriminant: '', pValue: '', qValue: '', roots: [] as number[] })
  const [history, setHistory] = useState<{ a: number; b: number; c: number; d: number }[]>([]);

  const a = Number(aValue);
  const b = Number(bValue);
  const c = Number(cValue);
  const d = Number(dValue);

  useEffect(() => {

    const eps = 1e-12;
    let newResults = { r1: '', r2: '', r3: '', discriminant: '', pValue: '', qValue: '', roots: [] as number[] }

    if (Math.abs(a) < eps) { /* Guarding against quadratics and linear equations. All cofficient letters have been shifted one over to the right because we are taking values from the form of a cubic equation */
      newResults.pValue = '';
      newResults.qValue = '';
      if (Math.abs(b) > eps) { /* Quadratic solver */

        const discriminant = c * c - 4 * b * d;
        newResults.discriminant = discriminant.toFixed(6);

        if (Math.abs(discriminant) < eps) {
          const rootOne = -c / (2 * b)
          newResults.r1 = `Double Root = ${rootOne.toFixed(6)}`;
          newResults.roots.push(rootOne)
        } else if (discriminant > 0) {
          const rootOne = (-c + Math.sqrt(discriminant)) / (2 * b);
          const rootTwo = (-c - Math.sqrt(discriminant)) / (2 * b);
          newResults.r1 = `Root 1 = ${rootOne.toFixed(6)}`;
          newResults.r2 = `Root 2 = ${rootTwo.toFixed(6)}`;
          newResults.roots.push(rootOne, rootTwo)
        } else {
          const realNum = -c / (2 * b)
          const imagNum = (Math.sqrt(Math.abs(discriminant))) / (2 * b)
          newResults.r1 = `Root 1 = ${realNum.toFixed(6)} + ${imagNum.toFixed(6)}i`;
          newResults.r2 = `Root 2 = ${realNum.toFixed(6)} - ${imagNum.toFixed(6)}i`;
        }
      } else if (Math.abs(c) > eps) { /* Linear Solver */
        const rootOne = -d / c
        newResults.r1 = `Root = ${rootOne.toFixed(6)}`
        newResults.roots.push(rootOne)
      } else {
        if (Math.abs(d) < eps) {
          newResults.r1 = 'Infinite Solutions'
        } else {
          newResults.r1 = 'No Solutions'
        }
      }
    } else { /* Cubic solver */
      const p = (3 * a * c - b * b) / (3 * a * a);
      const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
      const shift = b / (3 * a);
      const discriminant = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);
      newResults.discriminant = discriminant.toFixed(6);
      newResults.pValue = p.toFixed(6);
      newResults.qValue = q.toFixed(6);

      if (discriminant < -eps) { /* Trigonometric Method */
        const acosX = -q / (2 * Math.sqrt(-((p / 3) ** 3)));
        const limiter = Math.max(-1, Math.min(1, acosX));
        const theta = (1 / 3) * Math.acos(limiter);

        const g = 2 * Math.sqrt(Math.max(0, -p / 3));

        const rootOne = g * Math.cos(theta) - shift;
        const rootTwo = g * Math.cos(theta + (2 * Math.PI) / 3) - shift;
        const rootThree = g * Math.cos(theta + (4 * Math.PI) / 3) - shift;
        newResults.r1 = `Root 1 = ${rootOne.toFixed(6)}`;
        newResults.r2 = `Root 2 = ${rootTwo.toFixed(6)}`;
        newResults.r3 = `Root 3 = ${rootThree.toFixed(6)}`;
        newResults.roots.push(rootOne, rootTwo, rootThree)
      } else {

        const limiter = Math.max(0, discriminant);
        const u = Math.cbrt(-q / 2 + Math.sqrt(limiter));
        const v = Math.cbrt(-q / 2 - Math.sqrt(limiter));
        const n = -((u + v) / 2);
        const m = (Math.sqrt(3) * (u - v)) / 2;

        if (discriminant > eps) { /* Cardano's method */
          const rootOne = u + v - shift;
          const realNum = n - shift;
          const imagNum = m;

          newResults.r1 = `Root 1 = ${rootOne.toFixed(6)}`;
          newResults.r2 = `Root 2 = ${realNum.toFixed(6)} + ${imagNum.toFixed(6)}i`;
          newResults.r3 = `Root 3 = ${realNum.toFixed(6)} - ${imagNum.toFixed(6)}i`;
          newResults.roots.push(rootOne)
        } else { /* Cardano's Method */
          if (Math.abs(p) < eps && Math.abs(q) < eps) {
            newResults.r1 = `Triple Root = ${-shift.toFixed(6)}`;
            newResults.roots.push(-shift)
          } else {
            const singleRoot = u + v - shift;
            const doubleRoot = n - shift;
            newResults.r1 = `Root 1 = ${singleRoot.toFixed(6)}`;
            newResults.r2 = `Double Root = ${doubleRoot.toFixed(6)}`;
            newResults.roots.push(singleRoot, doubleRoot)
          }
        }
      }
    }
    setResults(newResults);
  }, [aValue, bValue, cValue, dValue]);

  return (
    <div className="min-h-screen bg-[#f4f7f6] p-5 flex flex-col items-center font-sans text-[#333]">
      <h1 className="text-2xl font-bold my-1 text-center">Cubic Solver</h1>
      <h5 className="text-base font-normal text-[#666] max-w-[600px] mb-5 text-center leading-tight">
        Welcome to a cubic solver, you will probably find many more that may or may not be much better than this one. Please waste your time here.
      </h5>
      <CubicEquation
        a={a}
        b={b}
        c={c}
        d={d}
      />
      <div className="flex flex-row items-start gap-8 bg-white p-[30px] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-fit mx-auto my-5">
        <div className="flex flex-col min-w-[250px]">
          <CubicInput
            a={a}
            b={b}
            c={c}
            d={d}
            setA={setA}
            setB={setB}
            setC={setC}
            setD={setD}
            handleSave={() => setHistory([...history, { a, b, c, d }])}
          />
          <CubicTable
            r1={results.r1}
            r2={results.r2}
            r3={results.r3}
            discriminant={results.discriminant}
            pValue={results.pValue}
            qValue={results.qValue}
          />
        </div>
        <CubicGraph
          a={a}
          b={b}
          c={c}
          d={d}
          roots={results.roots}
        />
        <CubicHistory
          history={history}
          setA={setA}
          setB={setB}
          setC={setC}
          setD={setD}
        />
      </div>
    </div>
  )
};