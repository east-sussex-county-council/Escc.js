@echo off
set nuspec="%1"
set nuspec=%nuspec:\=\\%
nuget pack "%nuspec%Escc.DocumentsInNewWindow.js.nuspec"
nuget pack "%nuspec%Escc.Statistics.js.nuspec"
nuget pack "%nuspec%cascading-content.js.nuspec"