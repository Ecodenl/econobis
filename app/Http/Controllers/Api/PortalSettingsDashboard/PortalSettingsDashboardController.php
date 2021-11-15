<?php

namespace App\Http\Controllers\Api\PortalSettingsDashboard;

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
use JosKolenberg\LaravelJory\Facades\Jory;
use Config;
use Spatie\Valuestore\Valuestore;

class PortalSettingsDashboardController extends Controller
{

    public function jory()
    {
        return Jory::on(PortalSettingsDashboard::class);
    }

    public function get(Request $request): array {
        $key = $request->input('key');

        if(!$this->isWhiteListed($key)){
            return [];
        }

        return [
            $key => $this->getStore()->get($key)
        ];
    }

    public function multiple(Request $request): array {
        $store = $this->getStore();
        $keys = $this->getWhitelistedKeys($request);

        $response = [];

        foreach ($keys as $key){
            $response[$key] = $store->get($key);
        }

        return $response;
    }

    public function put(Request $request): array {
        $store = $this->getStore();
        $keyValues = $this->getWhitelistedKeyValues($request);

        $store->put($keyValues);

        return $store->all();
    }

    protected function getWhitelistedKeyValues(Request $request): array
    {
        $keyValues = [];
        foreach ($request->all() as $key => $value) {
            if ($this->isWhiteListed($key)) {
                $keyValues[$key] = $value;
            }
        }

        return $keyValues;
    }

    protected function getWhitelistedKeys(Request $request): array
    {
        $keys = [];
        foreach ($request->input('keys', []) as $key) {
            if ($this->isWhiteListed($key)) {
                $keys[] = $key;
            }
        }

        return $keys;
    }

    protected function isWhiteListed($key): bool
    {
        return in_array($key, ['welcomeMessage', 'widgets']);
    }

    protected function getStore(): Valuestore
    {
        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'portal-settings-dashboard.json'));
        return Valuestore::make($filePath);
    }

    public function store(RequestInput $input, Request $request)
    {
        //$this->authorize('manage', PortalSettingsDashboard::class);

        $data = $input->string('id')->whenMissing('')->onEmpty('')->next()
                ->string('order')->whenMissing('')->onEmpty('')->next()
                ->string('title')->whenMissing('')->onEmpty('')->next()
                ->string('text')->whenMissing('')->onEmpty('')->next()
                ->string('buttonText')->whenMissing('')->onEmpty('')->next()
                ->string('buttonLink')->whenMissing('')->onEmpty('')->next()
                ->get();

        $widget = new \stdClass();
        $widget->id = $data['id'];
        $widget->order = $data['order'];
        $widget->title = $data['title'];
        $widget->text = $data['text'];
        $widget->buttonText = $data['buttonText'];
        $widget->buttonLink = $data['buttonLink'];

        $this->getStore()->push('widgets', $widget);

        return response()->json($widget);
    }

    public function update(PortalSettingsDashboard $portalSettingsDashboard, RequestInput $input, Request $request)
    {
        $this->authorize('manage', PortalSettingsDashboard::class);

        $data = $input->string('welcomeMessage')->whenMissing('')->onEmpty('')->next()
            ->get();

        $portalSettingsDashboard->fill($data);
        $portalSettingsDashboard->save();

        return GenericResource::make($portalSettingsDashboard);
    }

    public function destroy(RequestInput $input, Request $request) {
        $data = $input->string('id')->whenMissing('')->onEmpty('')->next()->get();

        $widgets = $this->getStore()->get('widgets');

        $widgets = array_filter($widgets, function($value) use ($data) {
            return $value['id'] !== $data['id'];
        });

        $this->getStore()->put('widgets', $widgets);

        return response()->json($this->getStore()->get('widgets'));
    }
}