library(tidyverse)
library(magrittr)

data("txhousing")

txhousing_4Villes<-txhousing%>%
  filter(city %in% c("Houston","Dallas","Austin","San Antonio"))%>%
  mutate(Date=as.Date(paste0(year,"/",month,"/01")))
Q25_prix_med<-quantile(txhousing_4Villes$median,0.25,na.rm = T)
Q75_prix_med<-quantile(txhousing_4Villes$median,0.75,na.rm = T)


h<-ggplot(data = txhousing_4Villes,aes(x=city,y=median))+
  labs(title = "Répartition du prix médian des vents de maisons dasn 4 villes du Texas de 2000 à  2015", 
       x = "Poids des diamants en carats", 
       y = "Prix Median en dollars")
h+geom_jitter(alpha= I(1 / 5))




txhousing_moyen_4Villes<-txhousing_4Villes%>%
  group_by(Date)%>%
  summarise(Volume_moyen=mean(volume))%>%
  mutate(linetype="1")