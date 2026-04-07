type InputProps = {
    a: number;
    b: number;
    c: number;
    d: number;
    setA: (value: number) => void;
    setB: (value: number) => void;
    setC: (value: number) => void;
    setD: (value: number) => void;
    handleSave: () => void;
}

export const CubicInput = ({ a, b, c, d, setA, setB, setC, setD, handleSave }: InputProps) => {
    return (
        <form
        onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSave()
        }}
        >
            <div className="flex flex-col w-[250px] border-b-2 border-gray-200 pb-5 mb-5">

                <label className="text-sm font-bold mb-1 text-gray-600">a-value:</label>
                <input
                    className="p-1 mb-2 border border-gray-300 rounded text-base"
                    type="number"
                    value={a}
                    onChange={(e) => setA(Number(e.target.value))}
                />

                <label className="text-sm font-bold mb-1 text-gray-600">b-value:</label>
                <input
                    className="p-1 mb-2 border border-gray-300 rounded text-base"
                    type="number"
                    value={b}
                    onChange={(e) => setB(Number(e.target.value))}
                />

                <label className="text-sm font-bold mb-1 text-gray-600">c-value:</label>
                <input
                    className="p-1 mb-2 border border-gray-300 rounded text-base"
                    type="number"
                    value={c}
                    onChange={(e) => setC(Number(e.target.value))}
                />

                <label className="text-sm font-bold mb-1 text-gray-600">d-value:</label>
                <input
                    className="p-1 mb-2 border border-gray-300 rounded text-base"
                    type="number"
                    value={d}
                    onChange={(e) => setD(Number(e.target.value))}
                />

                <input
                    className="bg-[#3498db] hover:bg-[#2980b9] text-white font-bold p-2 mt-2 rounded cursor-pointer transition-colors duration-300"
                    type="submit"
                    value="Save"
                />

            </div>
        </form>
    )
}