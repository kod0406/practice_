#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void searchFile(const char* filename, const char* searchString) {
    FILE* file;

    file = fopen(filename, "r");

    if (file == NULL) {
        printf("������ �� �� �����ϴ�.\n");
        return;
    }

    char line[256];
    int lineNumber = 1;
    int found = 0;
    int searchStringLen = strlen(searchString);

    printf("�˻��� ���ڿ�: %s (����: %d)\n", searchString, searchStringLen);
    printf("�˻� ���� ���:-->\n\n");
    while (fgets(line, sizeof(line), file) != NULL) {
        if (strstr(line, searchString) != NULL) {
            found = 1;
            printf("%d: %s", lineNumber, line);
        }
        lineNumber++;
    }

    if (!found) {
        printf("�˻��� ������ �����ϴ�.\n");
    }

    fclose(file);
}

int main(int argc, char* argv[]) {
    if (argc < 3) {
        printf("����: searchfile srcfile string\n");
        return 1;
    }

    const char* srcfile = argv[1];
    const char* searchString = argv[2];

    searchFile(srcfile, searchString);

    return 0;
}
