# client.py

from concurrent.futures import ThreadPoolExecutor
import time
import urllib.request

LB_URL = "http://localhost:8000/api/products"
TOTAL_REQUESTS = 30
CONCURRENT_WORKERS = 10


def send_request(req_id):
    try:
        with urllib.request.urlopen(LB_URL) as response:
            backend = response.headers.get("X-Backend-Server")
            return backend
    except Exception as error:
        print(f"Request {req_id} failed: {error}")
        return None


if __name__ == "__main__":

    print("==================================================")
    print("       LAYER 1: CLIENT TRAFFIC GENERATOR")
    print("==================================================")

    print(
        f"Sending {TOTAL_REQUESTS} requests "
        f"with concurrency level = {CONCURRENT_WORKERS}...\n"
    )
    start_time = time.time()

    with ThreadPoolExecutor(max_workers=CONCURRENT_WORKERS) as executor:
        results = list(executor.map(send_request, range(TOTAL_REQUESTS)))

    total_time = time.time() - start_time

    counts = {}
    for server in results:
        if server:
            counts[server] = counts.get(server, 0) + 1

    print("--------------------------------------------------")
    print("               EXECUTION RESULTS")
    print("--------------------------------------------------")
    print(f"Total Processing Time: {total_time:.2f} seconds\n")
    print(f"{'Backend Target':<25} | {'Requests':<10} | {'Distribution':<10}")
    print("-" * 55)

    for server, count in sorted(counts.items()):
        percentage = (count / TOTAL_REQUESTS) * 100
        print(f"{server:<25} | {count:<10} | {percentage:.1f}%")

    print("--------------------------------------------------")