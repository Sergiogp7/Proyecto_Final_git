# Script para limpiar el puerto 8080 y arrancar la aplicación

$port = 8080
Write-Host "Comprobando si el puerto $port está ocupado..."

# Obtener conexiones en el puerto 8080
$connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($connections) {
    # Obtener PIDs únicos
    $pidsToKill = $connections.OwningProcess | Select-Object -Unique
    
    foreach ($pidKill in $pidsToKill) {
        if ($pidKill -ne 0) { # 0 es System Idle Process
            Write-Host "El puerto $port está ocupado por el proceso PID $pidKill. Deteniendo..."
            try {
                Stop-Process -Id $pidKill -Force -ErrorAction Stop
                Write-Host "Proceso $pidKill detenido correctamente."
            } catch {
                Write-Host "No se pudo detener el proceso $pidKill. Puede que necesites permisos de administrador."
            }
        }
    }
} else {
    Write-Host "El puerto $port está libre."
}

Write-Host "Iniciando la aplicación Spring Boot..."
Write-Host "-------------------------------------"
# Ejecutar Maven Wrapper
./mvnw.cmd spring-boot:run
