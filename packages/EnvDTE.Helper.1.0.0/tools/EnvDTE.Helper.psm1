function GetProjects()
{
    $items = $DTE.Solution.Projects
    $projectItems = @() 
    
    while ($items.Count -ne 0)
    {
        $newItems = @()
        foreach ($item in $items)
        {
            if ($item -ne $null)
            { 
                if ($item.FullName -ne $null -and $item.FullName.EndsWith('.csproj')) 
                { 
                    $projectItems = $projectItems + $item
                } 
                else 
                { 
                    if (($item.Name -ne '.nuget') -and ($item.Name -ne 'Solution Items'))
                    {
                        if ($item.SubProject -ne $null)
                        {
                            $newItems = $newItems + $item.SubProject
                        }
                        if ($item.ProjectItems -ne $null)
                        {
                            $newItems = $newItems + $item.ProjectItems
                        }
                    }
                }                
            }
        }
        $items = $newItems
    }
    return $projectItems
}

Export-ModuleMember GetProjects

function GetAllProjectItems($parent)
{
	$values = ($parent.ProjectItems | select *)
	$result = @()
	foreach ($value in $values)
	{
		if ($value -ne $parent -and $value.Name -ne $null -and (-not $value.Name.EndsWith(".tt")))
		{
			$result = $result + $value
			$result = $result + (GetAllProjectItems($value))
			$result = $result + (GetAllProjectItems($value.SubProject))
		}
	}
	return $result
}

Export-ModuleMember GetAllProjectItems

function GetFirstCsFile($projectItem)
{
	$value = $projectItem.ProjectItems | ?{($_.Name -ne $null) -and ($_.Name.EndsWith(".cs"))} | foreach{$_.Properties} | ?{$_.Name -eq "LocalPath"} | select -ExpandProperty Value
	if ($value -is [Array])
	{
		return $value[0]
	}
	else
	{
		return $value
	}	
}

Export-ModuleMember GetFirstCsFile


function GetProjectsUIHierarchyItems()
{
    $items = (($DTE.Windows | ?{$_.Type -eq 'vsWindowTypeSolutionExplorer'}).Object.UIHierarchyItems)[0].UIHierarchyItems
    $projectItems = @() 
    
    while ($items.Count -ne 0)
    {
        $newItems = @()
        foreach ($item in $items)
        {
            if ($item -ne $null)
            { 
                if ($item.Object.FullName -ne $null -and $item.Object.FullName.EndsWith('.csproj')) 
                { 
                    $projectItems = $projectItems + $item
                } 
                else 
                { 
                    if (($item.Name -ne '.nuget') -and ($item.Name -ne 'Solution Items'))
                    {
                        if ($item.UIHierarchyItems -ne $null)
                        {
                            $newItems = $newItems + $item.UIHierarchyItems
                        }
                    }
                }                
            }
        }
        $items = $newItems
    }
    return $projectItems
}

Export-ModuleMember GetProjectsUIHierarchyItems
