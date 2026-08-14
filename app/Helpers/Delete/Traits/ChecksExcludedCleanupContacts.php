<?php

namespace App\Helpers\Delete\Traits;

use App\Eco\Cooperation\Cooperation;

trait ChecksExcludedCleanupContacts
{
    private ?array $excludedCleanupContactIds = null;

    protected function isContactExcludedFromCleanup(?int $contactId): bool
    {
        if (! $contactId) {
            return false;
        }

        return in_array(
            $contactId,
            $this->getExcludedCleanupContactIds(),
            true
        );
    }

    protected function containsExcludedCleanupContact(array $contactIds): bool
    {
        $contactIds = array_values(
            array_unique(
                array_map(
                    'intval',
                    array_filter($contactIds)
                )
            )
        );

        return count(
                array_intersect(
                    $contactIds,
                    $this->getExcludedCleanupContactIds()
                )
            ) > 0;
    }

    protected function getExcludedCleanupContactIds(): array
    {
        if ($this->excludedCleanupContactIds !== null) {
            return $this->excludedCleanupContactIds;
        }

        $contactIds = [];
        $cooperation = $this->cooperation ?? Cooperation::first();

        foreach ($cooperation?->cleanupContactsExcludedGroups ?? [] as $excludedGroup) {
            $contactIds = array_merge(
                $contactIds,
                $excludedGroup->contactGroup->getAllContacts(true) ?? []
            );
        }

        return $this->excludedCleanupContactIds = array_values(
            array_unique(array_map('intval', $contactIds))
        );
    }
}