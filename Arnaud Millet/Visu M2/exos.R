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

ggplot2::ggplot(data = diamonds,aes(x=carat,y=price))+ geom_point()+geom_smooth()




gg<- ggplot(diamonds, aes(x=carat,y=price, color=cut))+geom_point()

gg

economics
?economics
#exercice1.1
ggplot2::ggplot(data = economics,aes(x = date,y = pce))+geom_line()
#exercice 1.2
p_1 <- ggplot2::ggplot(data = economics,aes(x = date,y = pce))+geom_line(color = "dodger blue", size = 1)
p_1

# labels  #Themes 
p_2 <- ggplot2::ggplot(data = economics,aes(x = date,y = pce))+geom_line(color = "dodger blue", size = 1) 
p_2+labs(title="Evolution des dépenses", x="la date",y="dépenses")+theme(plot.title = element_text(size=30,hjust = 0.5))
# on va changer le format de la date
p_2+scale_x_discrete(breaks = date_breaks("5 years"), labels = date_format("%Y"))

#facets
p_2+facet_wrap(~ cut,ncol = 3)




#grid arrange : 
data(mpg)
sp<- ggplot(mpg, aes())


