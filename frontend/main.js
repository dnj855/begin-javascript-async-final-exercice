import "./style.css";
import { Buttons } from "./ui/Buttons";
import { TodayHabits } from "./ui/TodayHabits";

const todayHabits = new TodayHabits();
const buttons = new Buttons(todayHabits);

todayHabits.init();
buttons.init();
