#include <stdio.h>

int main() {
    int a[3][5] = {
        {1, 2, 3, 4, 5},
        {10, 20, 30, 40, 50},
        {100, 200, 300, 400, 500}
    };

    int* p[3];

    for (int i = 0; i < 5; i++) {
        p[i] = a[i];
    }

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 5; j++) {
            printf("%3d", p[i][j]);
        }
        printf("\n");
    }

    return 0;
}
