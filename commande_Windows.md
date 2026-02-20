### 📁 Commandes de gestion de fichiers - Windows Terminal
### 📂 Navigation et manipulation de fichiers (CMD)

## Navigation

# Afficher le répertoire courant
cd
echo %cd%

# Changer de répertoire
cd C:\Users\Nom
cd ..                     # Répertoire parent
cd \                      # Racine du disque
cd /d D:\Projets         # Changer de disque et répertoire

# Lister les fichiers et dossiers
dir                       # Liste simple
dir /w                    # Format large
dir /p                    # Page par page
dir /a                    # Afficher les fichiers cachés
dir /s                    # Avec sous-dossiers
dir *.txt                 # Filtre par extension

## Création et suppression

# Créer des dossiers
mkdir NouveauDossier
md Dossier1 Dossier2      # Multiples dossiers
mkdir Dossier\Sous-dossier

# Supprimer des dossiers
rmdir MonDossier          # Dossier vide seulement
rmdir /s MonDossier       # Supprimer avec contenu
rmdir /s /q MonDossier    # Supprimer sans confirmation

# Créer des fichiers
echo texte > fichier.txt
type nul > fichier.txt    # Fichier vide
copy nul fichier.txt      # Alternative

## Copie et déplacement

# Copier des fichiers
copy source.txt destination.txt
copy *.txt C:\Backup\
copy /y source.txt dest    # Écraser sans confirmation
copy /v source.txt dest    # Vérifier après copie

# Copier des dossiers
xcopy Dossier1 Dossier2 /e /i
xcopy C:\Source D:\Dest /e /h /c /y

# Robocopy (plus avancé)
robocopy C:\Source D:\Dest /MIR        # Miroir exact
robocopy C:\Source D:\Dest /E /COPY:DAT
robocopy C:\Source D:\Dest /MOV        # Déplacer

# Déplacer/Renommer
move ancien.txt nouveau.txt
move *.txt C:\Dossier\
move Dossier1 Dossier2
rename ancien_nom nouveau_nom
ren *.jpeg *.jpg          # Renommer extensions

### 🖥️ Commandes PowerShell pour la gestion de fichiers

#Navigation et listing

# Navigation
Get-Location              # ou pwd
Set-Location C:\Users     # ou cd
Set-Location ..           # ou cd ..

# Lister les fichiers
Get-ChildItem             # ou ls, dir
Get-ChildItem *.txt
Get-ChildItem -Recurse    # Avec sous-dossiers
Get-ChildItem -Hidden     # Fichiers cachés
ls -Recurse *.ps1 | Select-Object FullName

## Manipulation

# Créer des fichiers/dossiers
New-Item -Path . -Name "Dossier" -ItemType Directory
New-Item fichier.txt -ItemType File
New-Item .\test\fichier.txt -Force

# Supprimer
Remove-Item fichier.txt   # ou rm, del
Remove-Item Dossier -Recurse -Force

# Copier
Copy-Item source.txt dest.txt
Copy-Item C:\Source\* D:\Dest -Recurse
cp *.ps1 C:\Scripts\

# Déplacer/Renommer
Move-Item ancien.txt nouveau.txt
Move-Item *.txt C:\Dossier\
Rename-Item fichier.txt nouveau.txt

### ⚙️ Configuration de Windows Terminal

## Fichier de configuration principal

# Emplacement du fichier settings.json
%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json
# Windows Terminal Preview
%LOCALAPPDATA%\Microsoft\Windows Terminal Preview\settings.json

## Commandes de base dans Windows Terminal

# Ouvrir les paramètres
Ctrl + ,                  # Interface graphique
Ctrl + Shift + ,          # Ouvrir settings.json directement

# Nouveaux onglets et fenêtres
Ctrl + Shift + T          # Nouvel onglet par défaut
Ctrl + Shift + 1-9         # Nouvel onglet profil spécifique
Ctrl + Shift + N          # Nouvelle fenêtre
Alt + Shift + D            # Dupliquer l'onglet

# Navigation
Ctrl + Tab                 # Onglet suivant
Ctrl + Shift + Tab         # Onglet précédent
Ctrl + Alt + 1-9           # Aller à l'onglet spécifique
Alt + Flèches               # Redimensionner volet

## Personnalisation via CLI

# Lister les profils disponibles
wt -p "Windows PowerShell"
wt --list-profiles

# Ouvrir avec profil spécifique
wt -p "Ubuntu"
wt -p "Command Prompt"

# Configurations avancées
wt --maximized
wt --fullscreen
wt --focus

# Commandes avec paramètres
wt -d C:\Projets          # Dossier de démarrage spécifique
wt -p "Ubuntu" -d ~       # WSL Ubuntu dans home
wt --title "Mon Terminal"

### 🔧 Commandes système utiles

## Informations système

# CMD
systeminfo                # Informations complètes
ver                       # Version Windows
wmic os get Caption       # Version OS
hostname                  # Nom de l'ordinateur

# PowerShell
Get-ComputerInfo
Get-WindowsVersion
Get-Service
Get-Process

## Gestion des processus

# CMD
tasklist                  # Liste des processus
taskkill /PID 1234 /F     # Tuer un processus
taskkill /IM notepad.exe /F

# PowerShell
Get-Process
Stop-Process -Name notepad
Start-Process notepad.exe


# Supprimer des fichiers
del fichier.txt
del *.tmp                 # Supprimer par extension
del /s *.log              # Supprimer dans sous-dossiers
del /f *.sys              # Forcer suppression

## Variables d'environnement

# CMD
set                       # Lister toutes les variables
set PATH                  # Afficher PATH
set MYVAR=valeur          # Définir variable temporaire
setx MYVAR "valeur"       # Variable permanente

# PowerShell
Get-ChildItem Env:
$env:Path
[Environment]::SetEnvironmentVariable("MYVAR", "valeur", "User")

### 📝 Raccourcis clavier essentiels

## Navigation et édition

Ctrl + C                  # Annuler/Arrêter commande
Ctrl + V                  # Coller
Ctrl + A                  # Tout sélectionner
Ctrl + F                  # Rechercher
Ctrl + Shift + V          # Coller (terminal)
Ctrl + Shift + C          # Copier (terminal)

### Gestion de l'historique

F7                        # Afficher historique
F8                        # Rechercher dans historique
F9                        # Exécuter commande par numéro
Ctrl + R                  # Recherche inverse (PowerShell)

## Zoom et apparence 

Ctrl + +                  # Zoom avant
Ctrl + -                  # Zoom arrière
Ctrl + 0                  # Réinitialiser zoom
Alt + Entrée              # Plein écran

## Pipelines et redirections

# Redirection de sortie
dir > liste.txt           # Rediriger vers fichier
dir >> liste.txt          # Ajouter à la fin
dir 2> erreurs.txt        # Rediriger erreurs
dir > nul                 # Supprimer sortie

# Pipeline
dir | find ".txt"         # Filtrer (CMD)
Get-Process | Where-Object CPU -gt 10 | Export-CSV process.csv  # PowerShell

## Recherche avancée

# CMD
findstr "texte" *.txt
findstr /s "erreur" *.log
findstr /i "ERROR" fichier.log  # Insensible à la casse

# PowerShell
Select-String "erreur" *.log
Get-ChildItem -Recurse *.txt | Select-String "important"
