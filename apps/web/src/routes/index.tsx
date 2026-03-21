import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChartColumnBig,
  Database,
  FileSpreadsheet,
  Github,
  LineChart,
} from "lucide-react";
import { ThemeToggle } from "~/components/theme-toggle";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-20 items-center justify-between mx-auto">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-90"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ChartColumnBig className="size-5" />
              </div>
              <span className="font-mono text-base font-medium tracking-tight">
                GridToGraph
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-2">
            <Button asChild>
              <Link to="/dashboard">Enter Dashboard</Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center">
        <section className="w-full py-10 md:py-20 lg:py-26 flex flex-col items-center justify-center text-center">
          <div className="container px-4 md:px-6 flex flex-col items-center gap-8">
            <div className="space-y-4 flex flex-col items-center">
              <Badge variant="secondary" className="p-3 w-fit">
                Intern Task
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl leading-tight">
                Data Visualization using <br />
                <span className="text-primary">MERN Stack.</span>
              </h1>
              <p className="max-w-2xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A minimalist internship project designed to simplify data
                management. Upload spreadsheets, manage records, and visualize
                data.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="h-11 px-8" asChild>
                <Link to="/dashboard">
                  Get Started <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button variant="outline" className="h-11 px-8" asChild>
                <a
                  href="https://github.com/sam4web/task-gridtograph"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
              </Button>
            </div>

            <div className="w-full max-w-5xl mt-8 rounded-xl border border-border bg-card p-2 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="overflow-hidden rounded-lg border border-border bg-muted/50">
                <img
                  src="/hero-image.png"
                  alt="Application Dashboard Preview"
                  className="aspect-video w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="w-full py-10 md:py-20 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                How it Works
              </h2>
              <p className="max-w-225 w-full text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A simple three-step flow to manage and understand your data.
              </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card className="bg-background/50 border-border gap-3">
                <CardHeader>
                  <FileSpreadsheet className="size-8 text-primary mb-1" />
                  <CardTitle className="font-medium">
                    1. Upload Dataset
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-base text-muted-foreground">
                  Upload Excel/CSV files. The application automatically maps
                  columns and prepares data for processing.
                </CardContent>
              </Card>
              <Card className="bg-background/50 border-border gap-3">
                <CardHeader>
                  <Database className="size-8 text-primary mb-1" />
                  <CardTitle className="font-medium">
                    2. CRUD Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-base text-muted-foreground">
                  Refine data using the built-in editor. Create, update, or
                  delete records directly.
                </CardContent>
              </Card>
              <Card className="bg-background/50 border-border gap-3">
                <CardHeader>
                  <LineChart className="size-8 text-primary mb-1" />
                  <CardTitle className="font-medium">3. Visualize</CardTitle>
                </CardHeader>
                <CardContent className="text-base text-muted-foreground">
                  Select axes to generate charts. Instantly spot trends and
                  outliers in your dataset.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <p className="text-sm text-muted-foreground">
            © 2026 GridToGraph. Built for <strong>internship task</strong>.
          </p>
          <a
            href="https://github.com/sam4web/task-gridtograph"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="size-5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
