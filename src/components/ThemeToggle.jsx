import { useState } from 'react';
import {Moon, Sun} from 'lucide-react';

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

return <button>{isDarkMode ? <Sun/> : <Moon/>}</button>
}