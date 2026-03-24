import IconsCards, { IIconsCardsProps } from "./IconsCards";

interface IDashboardCardProps {
  title: string;
  totalProyectos: number;
  footerText?: string;
  icon: IIconsCardsProps["icon"];
  taskBreakdown?: {
    completadas: number;
    enProgreso: number;
    pendientes: number;
  };
  numberColor?: string;
}

const DashboardCard = (props: IDashboardCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">
            {props.title}
          </p>
          <p className={`text-3xl font-bold ${props.numberColor || "text-gray-900"}`}>
            {props.totalProyectos}
          </p>
        </div>
        <IconsCards icon={props.icon} />
      </div>
      <div className="mt-2 flex gap-2 text-sm">
        {props.taskBreakdown ? (
          <>
            <span className="text-green-600">
              ✓ {props.taskBreakdown.completadas}
            </span>
            <span className="text-yellow-600">
              ◷ {props.taskBreakdown.enProgreso}
            </span>
            <span className="text-gray-600">
              ○ {props.taskBreakdown.pendientes}
            </span>
          </>
        ) : (
          <span className="text-green-600">{props.footerText}</span>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
