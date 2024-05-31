import "./style.css";
import { AddHabitDialog } from "./ui/AddHabitDialog";
import { TodayHabits } from "./ui/TodayHabits";

const todayHabits = TodayHabits.getInstance();
const addHabitDialog = AddHabitDialog.getInstance();

todayHabits.init();
addHabitDialog.init();
