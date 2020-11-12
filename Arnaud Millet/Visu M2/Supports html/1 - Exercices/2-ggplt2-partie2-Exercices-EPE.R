library(ggplot2)
install.packages("tidyverse")
library(tidyverse)
if(!require(tidyverse)) {
  install.packages("tidyverse"); require(tidyverse)} #load / install+load installr
if(!require(ggplot2)) {
  install.packages("ggplot2"); require(ggplot2)} #load / install+load installr
if(!require(lubridate)) {
  install.packages("lubridate"); require(lubridate)} #load / install+load installr
library("lubridate")
#Charger le package ggplot2, et utiliser la fonction data() pour charger en mémoire le jeu de données economics. Consulter la page d’aide de ce jeu de données pour prendre connaissance de son contenu ;
?economics
#Serie temporelle
data(economics, package="ggplot2")  # init data
economics <- data.frame(economics)  # convert to dataframe
#À l’aide de la fonction ggplot(), représenter les dépenses personnelles de consommation (pce) en fonction de la date (date). Les observations doivent être connectées par une ligne.
p<-ggplot(economics) + 
  geom_line(aes(x=date, y=pce, color="pcs")) 
  
p  


#Modifier le graphique de la question précédente de manière à ce que la couleur de la ligne soit dodger blue et définir la taille de la ligne à 0.5. Stocker le résultat dans un objet que l’on appellera p_1 ;
p<-ggplot(economics) + 
  geom_line(aes(x=date, y=pce, color="pcs")) 

p  








p<-ggplot(economics) + 
  geom_line(aes(x=date, y=pce, color="pcs")) + 
  geom_line(aes(x=date, y=unemploy, col="unemploy")) + 
  scale_color_discrete(name="Legend") + 
  labs(title="Economics") 
p
p + annotate("text", x = economics$date[which.max(economics$unemploy)], y = economics$unemploy[which.max(economics$unemploy)], label ="Max" , size=3 , angle=0, fontface="bold",hjust = 1.5)
# Ajouter un rectangle
library("lubridate")
x1<-floor_date(economics$date[which.max(economics$unemploy)]-(365*5), unit = "year")
x2<-floor_date(economics$date[which.max(economics$unemploy)]+(365*5), unit = "year")-1
y1<-economics$unemploy[which.max(economics$unemploy)]-1000
y2<-economics$unemploy[which.max(economics$unemploy)]+1000
p + annotate("rect", xmin=x1, xmax=x2, ymin=y1 , ymax=y2, alpha=0.2, color="blue", fill="blue")


# Ajouter une flêche
p + annotate("segment", x = economics$date[which.max(economics$unemploy)]-(365*10), 
             xend = economics$date[which.max(economics$unemploy)], 
             y = max(economics$unemploy), 
             yend = max(economics$unemploy), 
             colour = "pink", size=1, alpha=0.6, arrow=arrow())


