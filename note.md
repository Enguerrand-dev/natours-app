# ERREUR dans express

## 2 types d'erreur dans express = OPERATIONAL ET PROGRAMMING

### OPERATIONAL = erreur due aux users ou aux différentes connection --> facile à attraper avec express utiliser un global middleware qui va catch toute les erreurs

### PROGRAMMING = erreur due aux codes = bug

# Différent type de relation:

1:1 --> un champs ne peut avoir que une valeur
1:MANY --> 1:FEW / 1:MANY / 1:TON
\*1:FEW --> 1 film pour appartenir à plusieurs récompense
\*1:MANY --> 1 film pour appartenir à des centaines ou milliers review
\*1:TON --> 1 film pour appartenir à des millions : différence entre 1:MANY et 1:TON --> siça peut grandir à l'infinie c'est TON

MANY:MANY -> Un film peut avoir plusieurs acteurs mais des acteurs peuvent avoir plusieurs films

# REFERENCING VS EMBEDDING

REFERENCED / NORMALIZED --> data séparé par différents documents --> Système parent / enfants
\*PRO: performance -> plus simple de query chaque document // CON: Besoin de deux ou plus de querys pour avoir toutes les données
EMBEDDED / DENORMALIZED --> Intégré directement dans le document principal --> moins de requête
\*PRO: performance -> toute les données dans une seule query // CON: pas de possibilité de query sur les data 'nested'

# QUAND EMBED OU REFERENCE

1° Type de relation entre les données
2° Data access patterns: combien de fois les data sont READ/WRITE
3° Data closeness: how 'much' the data is related

EMBEDDING

1° 1:FEW  
1:MANY

2° Data mostly read  
 Data does not change quickly  
 High read/write ration

3° Dataset really belong toghter

REFERENCING
1° 1:MANY
1:TON
MANY:MANY

2° Data is update a lot AND Low read/write
3° Si on doit fréquement faire des query sur les datasets de façon séparer

# TYPE REFERENCING

1° CHILD REFERENCING --> On lie le parent aux enfants // Liste des enfants dans le parent --> quelques uns
2° PARENT REFERENCING --> On lie l'enfant au parent // Dans l'enfant champs qui lie au parent --> 1:MANY / 1:TON
3° TWO WAY REFERENCING --> MANY:MANY

!! MONGODB NE JAMAIS LAISSE UN TABLEAU GRANDIR INDEFINEMENT !!

EX: DATAMODELING

TOURS
USERS
REVIEWS
LOCATIONS
BOOKINGS

USERS --> REVIEW : 1:MANY / PARENT REFERENCING
TOURS --> REVIEW : 1:MANY / PARENT REFERENCING
TOURS --> LOCATION : FEW:FEW / EMBEDDING

TOURS <--> USERS : FEW:FEW / CHILD REFERENCING OR EMBEDDING
