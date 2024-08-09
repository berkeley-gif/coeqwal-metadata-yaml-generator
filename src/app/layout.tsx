import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import "./globals.css";
import { AppBar, Button, CssBaseline, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export const metadata: Metadata = {
  title: "YAML Generator",
  description: "Create YAML files with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
              
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                  YAML Generator
                </Typography>
                <Link href="/yaml-config" passHref>
                  <Button variant="contained" sx={{ boxShadow: 'none' }}>Overview</Button>
                </Link>
              </Toolbar>
            </AppBar>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
