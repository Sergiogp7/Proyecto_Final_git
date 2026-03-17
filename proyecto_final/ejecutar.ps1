$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = Get-Location }

$port = 8080
$url = "http://localhost:$port"

Write-Host "Comprobando puerto $port en $scriptDir..."
$connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($connections) {
    $pidsToKill = $connections.OwningProcess | Select-Object -Unique
    foreach ($pidKill in $pidsToKill) {
        if ($pidKill -ne 0) {
            Write-Host "Deteniendo proceso en puerto $port (PID: $pidKill)..."
            try {
                Stop-Process -Id $pidKill -Force -ErrorAction SilentlyContinue
            }
            catch {}
        }
    }
}

Write-Host "Iniciando GymCore..."
# Usamos -WorkingDirectory y rutas explicitas para evitar errores de comando no encontrado
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Iniciando servidor de Spring Boot en $scriptDir...'; .\mvnw.cmd spring-boot:run" -WorkingDirectory $scriptDir

Write-Host "Esperando a que la aplicacion este lista..."
$ready = $false
$maxTries = 40
$tries = 0

while (-not $ready -and $tries -lt $maxTries) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -ErrorAction SilentlyContinue
        if ($response -and $response.StatusCode -eq 200) {
            $ready = $true
        }
        else {
            Start-Sleep -Seconds 2
            $tries++
        }
    }
    catch {
        Start-Sleep -Seconds 2
        $tries++
    }
}

if ($ready) {
    Write-Host "`n¡GymCore esta listo! Abriendo el navegador..."
    Start-Process $url
}
else {
    Write-Host "`nLa aplicacion esta tardando mucho en responder. Revisa la nueva ventana de PowerShell para ver los logs."
}
