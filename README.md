# Transformação Interativa de Cúbicas de Bézier Controladas por Cúbicas de Bézier

Projeto desenvolvido para a disciplina Processamento Gráfico, CIn/UFPE, 2018.2

## Descrição
O usuário entra via mouse com 4 poligonais de cúbicas de Bézier. Depois que as 4 curvas estão configuradas da forma desejada, então um “slide button” será disponibilizado representando o parâmetro que irá controlar a interpolação das curvas. As curvas entradas pelo usuário funcionam como pontos de controle. Ou seja, para encontrar a curva correspondente ao parâmetro determinado pelo slide button, o sistema utiliza os correspondentes pontos de controle das 4 curvas e produz uma avaliação de De Casteljau para carreira de pontos correspondentes; estas avaliações serão os pontos de controle da curva procurada. Por exemplo, utiliza-se o primeiro ponto de controle de cada curva (são 4 pontos então, que serão os pontos de controle da carreira) e avalia-se com o parâmetro induzido pelo slide button, depois se utiliza o segundo ponto de controle de cada curva, e avalia-se do mesmo jeito, e assim por diante, até se obterem os quatros pontos avaliados, que serão os pontos de controle da curva procurada.

## Autores
- Lucas Barros - lbam@cin.ufpe.br
- Lúcio Melo - lfmm2@cin.ufpe.br
