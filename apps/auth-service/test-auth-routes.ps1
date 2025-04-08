# Test des routes d'authentification - Script PowerShell
Write-Host "`n=== DÉMARRAGE DES TESTS DES ROUTES D'AUTHENTIFICATION ===" -ForegroundColor Blue
Write-Host "Assurez-vous que le service d'authentification est en cours d'exécution" -ForegroundColor Yellow
Write-Host

# Vérifier si Node.js est installé
try {
    $nodeVersion = node -v
    Write-Host "Node.js détecté: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js n'est pas installé ou n'est pas dans le PATH. Veuillez l'installer pour exécuter ce script." -ForegroundColor Red
    exit 1
}

# Exécuter le script JavaScript
try {
    Write-Host "Exécution des tests d'authentification...`n" -ForegroundColor Cyan
    node test-auth-routes.js
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nTests terminés avec succès" -ForegroundColor Green
    } else {
        Write-Host "`nDes erreurs se sont produites pendant les tests" -ForegroundColor Red
    }
} catch {
    Write-Host "Une erreur s'est produite lors de l'exécution du script: $_" -ForegroundColor Red
}

Write-Host "`nAppuyez sur n'importe quelle touche pour quitter..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 