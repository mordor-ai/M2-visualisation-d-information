#install.packages(c("leaflet", "sf", "units", "osmdata", "treemap", "d3treeR", "collapsibleTree", "waffle", "tidyverse", "extrafont", "tm", "SnowballC", "wordcloud", "FactoMineR", "factoextra", "cowplot", "lubridate", "WDI", "rworldmap", "ggrepel"))

# aestetics


data(mpg)
plot(x= diamonds$carat, y=diamonds$price)

qplot(x=diamonds$carat, y=diamonds$price, data = diamonds, alpha=1/5,geom = c("point","smooth"))

qplot(x=diamonds$carat, data = diamonds, geom = "histogram",color ="red",binwidth=0.01,xlim=c(0,3))

#facets
g1 <-qplot(x=mpg$displ, y=mpg$hwy, data = mpg,geom=c("point","smooth"), facets = .~year)
class(g1)
# format de données 
saveRDS(g1, "g1.rds")
# lecture du  RDS
g2 <- readRDS("g1.")rds
# affichage du RDS
g2
#  avec lattice
library(lattice)
lattice::xyplot(price ~ carat, data = diamonds)


# avec ggpplot
library(ggplot2)

ggplot2::ggplot(data = diamonds,aes(x=carat,y=price))+ geom_point()+geom_smooth(data = diamonds, method = "loess", formula = "y~x")

