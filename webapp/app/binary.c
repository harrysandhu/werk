#include <stdio.h>

int main(void){
    int n = 0;
    scanf("%i\n", &n);
    int r[10000];

    int q = n;
    int i = 0;
    while(q >= 1){
        r[i] = q % 2;
        q = q / 2;
        i++;
    }   
    int s = sizeof(n) * 8;

    for(int i = s; i >= 0; i--){
        printf("%i", r[i]);
       
    }
    printf("......%i", n);
     printf("\n");
}

