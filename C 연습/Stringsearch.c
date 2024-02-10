#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void searchFile(const char* filename, const char* searchString) {
    FILE* file;

    file = fopen(filename, "r");

    if (file == NULL) {
        printf("파일을 열 수 없습니다.\n");
        return;
    }

    char line[256];
    int lineNumber = 1;
    int found = 0;
    int searchStringLen = strlen(searchString);

    printf("검색된 문자열: %s (길이: %d)\n", searchString, searchStringLen);
    printf("검색 내용 출력:-->\n\n");
    while (fgets(line, sizeof(line), file) != NULL) {
        if (strstr(line, searchString) != NULL) {
            found = 1;
            printf("%d: %s", lineNumber, line);
        }
        lineNumber++;
    }

    if (!found) {
        printf("검색된 내용이 없습니다.\n");
    }

    fclose(file);
}

int main(int argc, char* argv[]) {
    if (argc < 3) {
        printf("사용법: searchfile srcfile string\n");
        return 1;
    }

    const char* srcfile = argv[1];
    const char* searchString = argv[2];

    searchFile(srcfile, searchString);

    return 0;
}
