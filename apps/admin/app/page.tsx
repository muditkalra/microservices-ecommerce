import AppAreaChart from "@/components/AppAreaChart";
import AppBarCharts from "@/components/AppBarCharts";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";

export default function Home() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
			<div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-2 2xl:col-span-2"><AppBarCharts /></div>
			<div className="bg-primary-foreground p-4 rounded-lg"><CardList title="latest Transactions" /></div>
			<div className="bg-primary-foreground p-4 rounded-lg"><AppPieChart /></div>
			<div className="bg-primary-foreground p-4 rounded-lg"><TodoList /></div>
			<div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2"><AppAreaChart /></div>
			<div className="bg-primary-foreground p-4 rounded-lg"><CardList title="Popular Product" /></div>
		</div>
	);
}
