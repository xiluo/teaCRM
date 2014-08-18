param($installPath, $toolsPath, $package)

foreach ($_ in Get-Module | ?{$_.Name -eq 'EnvDTE.Helper'})
{
    Remove-Module 'EnvDTE.Helper'
}

Import-Module (Join-Path $toolsPath EnvDTE.Helper.psm1)
