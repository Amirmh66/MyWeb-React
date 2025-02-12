import { useEffect, useState } from 'react'

function Theme() {
    const [theme, setTheme] = useState("light");

    const darkTheme = () => {
        const newTheme = "dark"
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };
    const lightTheme = () => {
        const newTheme = "light"
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);
    return (
        <>
            <div className='bg-white dark:bg-gray-950 border border-gray-700 rounded-lg p-2 my-2 flex justify-between items-center'>
                <div>
                    <p className='font-bold text-sm'>Theme</p>
                </div>
                <div className='flex items-center gap-3'>

                    <div className='flex items-center gap-1 '>
                        <label htmlFor="dark">Dark</label>
                        <input name="theme" type="radio" onClick={darkTheme} id='dark'
                            className={`border cursor-pointer  transition-colors ${theme === "dark" ? ("bg-black") : ("bg-white")}`} value={"dark"} />
                    </div>

                    <div className='flex items-center gap-1'>
                        <label htmlFor="light">Light</label>
                        <input name="theme" type="radio" onClick={lightTheme} id='light'
                            className={`border cursor-pointer transition-colors ${theme === "light" ? ("bg-black") : ("bg-white")}`} value={"light"} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Theme
