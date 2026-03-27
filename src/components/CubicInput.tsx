import { useState, useRef } from "react";

export const CubicInput = () => {
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(0);
  const [d, setD] = useState<number>(0);
  const result1 = useRef<HTMLInputElement | null>(null);
  const result2 = useRef<HTMLInputElement | null>(null);
  const result3 = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: React.ChangeEvent) => {
    event.preventDefault();

    if (result1.current) {

    }
  };

  return (
    <div className="">
      <div className="">
        <form className="" onSubmit={handleSubmit}>
          <label>
            a-value:
          </label>
          <input
            type="number"
            step="any"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            required
            className=""
          />

          <label>
            b-value:
          </label>
          <input
            type="number"
            step="any"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            required
            className=""
          />

          <label>
            c-value:
          </label>
          <input
            type="number"
            step="any"
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
            required
            className=""
          />

          <label>
            d-value:
          </label>
          <input
            type="number"
            step="any"
            value={d}
            onChange={(e) => setD(Number(e.target.value))}
            required
            className=""
          />

          <input
            ref={result1}
            type="text"
            readOnly
            className=""
          />

          <input
            ref={result2}
            type="text"
            readOnly
            className=""
          />

          <input
            ref={result3}
            type="text"
            readOnly
            className=""
          />

          <input
            type="submit"
            value="Calculate"
            className=""
          />
        </form>
      </div>
    </div>
  )
}