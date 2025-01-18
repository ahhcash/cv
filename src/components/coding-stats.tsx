"use client";
import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

// The interfaces and tooltips remain the same, just showing the modified layout
interface WakaTimeStats {
  data: {
    languages: Array<{
      name: string;
      percent: number;
      total_seconds: number;
      text: string;
    }>;
    projects: Array<{
      name: string;
      percent: number;
      total_seconds: number;
      text: string;
    }>;
    human_readable_total: string;
    daily_average: number;
  };
}

// Tooltip components remain the same
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-mocha-overlay bg-mocha-base/95 p-4 shadow-lg backdrop-blur-sm transition-all duration-300">
        <p className="font-mono text-sm text-mocha-text">{`${payload[0].name}: ${payload[0].value.toFixed(1)}%`}</p>
        <p className="font-mono text-xs text-mocha-subtext">{`${(payload[0].payload.total_seconds / 3600).toFixed(1)} hours`}</p>
      </div>
    );
  }
  return null;
};

const ProjectTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-mocha-overlay bg-mocha-base/95 p-4 shadow-lg backdrop-blur-sm transition-all duration-300">
        <p className="font-mono text-sm text-mocha-text">{`${payload[0].payload.name}`}</p>
        <p className="font-mono text-xs text-mocha-subtext">{`${payload[0].payload.text} (${payload[0].payload.percent.toFixed(1)}%)`}</p>
      </div>
    );
  }
  return null;
};

export const CodingStats = () => {
  const [stats, setStats] = useState<WakaTimeStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/wakatime");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching WakaTime stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-mocha-mauve border-t-transparent" />
      </div>
    );
  }

  if (!stats) return null;

  const languageData = stats.data.languages
    .filter((lang) => lang.percent > 1)
    .sort((a, b) => b.percent - a.percent);

  const projectData = stats.data.projects
    .sort((a, b) => b.total_seconds - a.total_seconds)
    .reduce(
      (acc, project, index) => {
        if (index < 5) {
          acc.push(project);
        } else if (acc[5]) {
          acc[5].total_seconds += project.total_seconds;
          acc[5].percent += project.percent;
        } else {
          acc.push({
            name: "Others",
            total_seconds: project.total_seconds,
            percent: project.percent,
            text: `${Math.round(project.total_seconds / 3600)} hrs ${Math.round((project.total_seconds % 3600) / 60)} mins`,
          });
        }
        return acc;
      },
      [] as typeof stats.data.projects,
    );

  const COLORS = [
    "#cba6f7", // mauve
    "#f5c2e7", // pink
    "#89b4fa", // blue
    "#74c7ec", // sapphire
    "#94e2d5", // teal
    "#a6e3a1", // green
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="group border-mocha-overlay bg-mocha-surface/50 backdrop-blur-sm transition-all duration-300 hover:bg-mocha-surface/60 hover:shadow-[0_0_15px_rgba(203,166,247,0.1)]">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="flex items-center justify-between text-xl">
            <div className="space-y-1">
              <span className="text-mocha-text transition-colors duration-300 group-hover:text-mocha-lavender">
                languages
              </span>
              {/* Adding a subtitle to show the time period */}
              <p className="text-sm font-normal text-mocha-subtext">
                <span className="ml-1 inline-flex items-center rounded-md bg-gradient-to-r from-mocha-mauve/10 via-mocha-pink/10 to-mocha-blue/10 px-2 py-1 font-mono text-mocha-text ring-1 ring-inset ring-mocha-mauve/20">
                  {Math.round(stats.data.daily_average / 3600)}h{" "}
                  {Math.round((stats.data.daily_average % 3600) / 60)}m per day
                </span>
              </p>
            </div>
            <Badge className="bg-mocha-mauve/20 text-mocha-mauve transition-all duration-300 group-hover:bg-mocha-mauve/30">
              {stats.data.human_readable_total}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  dataKey="percent"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    name,
                    percent,
                    index,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 25;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    // Only show labels for languages with more than 2% usage
                    if (percent < 2) return null;

                    return (
                      <text
                        x={x}
                        y={y}
                        className={`fill-mocha-text font-mono text-xs transition-all duration-150 ${
                          activeIndex === index
                            ? "font-bold opacity-100"
                            : activeIndex === null
                              ? "opacity-75"
                              : "opacity-30"
                        }`}
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {`${name} (${percent.toFixed(1)}%)`}
                      </text>
                    );
                  }}
                >
                  {languageData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      opacity={
                        activeIndex === null || activeIndex === index ? 1 : 0.6
                      }
                      className="transition-all duration-150"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="group border-mocha-overlay bg-mocha-surface/50 backdrop-blur-sm transition-all duration-300 hover:bg-mocha-surface/60 hover:shadow-[0_0_15px_rgba(203,166,247,0.1)]">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="flex items-center justify-between text-xl">
            <span className="text-mocha-text transition-colors duration-300 group-hover:text-mocha-lavender">
              project focus
            </span>
            <Badge className="bg-mocha-mauve/20 text-mocha-mauve transition-all duration-300 group-hover:bg-mocha-mauve/30">
              top projects
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={projectData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "#a6adc8",
                    fontSize: 12,
                    fontFamily: "JetBrains Mono",
                  }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{
                    fill: "#a6adc8",
                    fontSize: 12,
                    fontFamily: "JetBrains Mono",
                  }}
                  label={{
                    value: "time %",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#a6adc8",
                    fontSize: 12,
                    fontFamily: "JetBrains Mono",
                  }}
                />
                <Tooltip content={<ProjectTooltip />} />
                <Area
                  type="monotone"
                  dataKey="percent"
                  stroke="#cba6f7"
                  fill="url(#colorGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#cba6f7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#cba6f7" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
