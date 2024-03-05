#include <stdio.h>

extern void global_increment();
extern void static_global_increment();

int main() {
    global_increment();
    global_increment();
    static_global_increment();
    static_global_increment();
    return 0;
}
