

const createEvent = () => {
    const handleRegistracija = (e: React.FormEvent) => {
        e.preventDefault();
    }
    return (
        <div className="w-full bg-white flex items-center justify-center">
            <form
                onSubmit={handleRegistracija}
                className="w-150 p-10 bg-[#2a263d] rounded-3xl flex flex-col flex-wrap gap-6"
            >
                <h1 className='text-center text-3xl'>Prijavi događaj koji organizirate</h1>
                <div className="flex gap-4">
                    <input
                        disabled
                        type="text"
                        name="organizacija"
                        placeholder="Organizacija" //izvuc iz baze nepromjenjivo
                        // value={"a"}
                        // value={formData.Username}
                        // onChange={handleChangeRegistracija}

                        className="flex-1 px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="text"
                        name="imeDogadaja"
                        // value={formData.Email}
                        // onChange={handleChangeRegistracija}
                        placeholder="Ime događaja"
                        className="w-full px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <input
                        type="text"
                        name="adresa"
                        // value={formData.Password}
                        // onChange={handleChangeRegistracija}
                        placeholder="Adresa"
                        className="w-full px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <select
                        id="grad"
                        name="grad"
                        className="px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    >
                        <option value="Dicmo">Dicmo</option>
                        <option value="Novalja">Novalja</option>
                        <option value="Split">Split</option>
                        <option value="Solin">Solin</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                        required
                    />
                    <label htmlFor="terms" className="text-white text-sm">
                        Slažem se s <a href="#" className="underline text-purple-400">uvjetima korištenja</a>
                    </label>
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                        required
                    />
                    <label htmlFor="terms" className="text-white text-sm">
                        Slažem se s <a href="#" className="underline text-purple-400">uvjetima korištenja</a>
                    </label>
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                        required
                    />
                    <label htmlFor="terms" className="text-white text-sm">
                        Slažem se s <a href="#" className="underline text-purple-400">uvjetima korištenja</a>
                    </label>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="eventTime" className="text-white font-medium pb-2 text-center">
                        Odaberi datum i vrijeme
                    </label>
                    <input
                        type="datetime-local"
                        id="eventTime"
                        name="eventTime"
                        className="px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        min={new Date().toISOString().slice(0, 16)} // prevents past date/time
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-lg transition-all"
                >
                    Prijavi
                    {/* {loading ? "Šalje se..." : "Registriraj se"} */}
                </button>
            </form>
        </div>
    )
}

export default createEvent;