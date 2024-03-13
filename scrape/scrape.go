package main

import (
	"fmt"
	"io"
	"net/http"
)

func data(n int) string {
	link := fmt.Sprintf("https://www.gutenberg.org/files/%d/%d-0.txt", n, n)
	return link
}

func epub(n int) string {
	link := fmt.Sprintf("https://www.gutenberg.org/cache/epub/%d/pg%d.txt", n, n)

	response, err := http.Get(link)
	if err != nil {
		fmt.Println(err)
	}
	defer response.Body.Close()

	if response.StatusCode != 200 {
		fmt.Println("status code error:", response.StatusCode)
		return ""
	}

	body, err := io.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err)
	}

	if len(body) != 0 {
		fmt.Println("Success:", n)
	} else {
		fmt.Println("Failed:", n)
	}

	return link
}

func main() {
	amount := 73067
	for i := 1; i <= amount; i++ {
		/* go func(i int) {
			epub(i)
		}(i) */
		epub(i)
	}
}
